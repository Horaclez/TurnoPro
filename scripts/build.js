const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.join(__dirname,'..'),www=path.join(root,'www'),nm=n=>path.join(root,'node_modules',n);
fs.rmSync(www,{recursive:true,force:true});fs.mkdirSync(path.join(www,'vendor'),{recursive:true});
const cpv=(from,to)=>fs.copyFileSync(nm(from),path.join(www,'vendor',to));
cpv('react/umd/react.production.min.js','react.js');
cpv('react-dom/umd/react-dom.production.min.js','react-dom.js');
cpv('jszip/dist/jszip.min.js','jszip.js');
cpv('jspdf/dist/jspdf.umd.min.js','jspdf.js');
let html=fs.readFileSync(path.join(root,'src','index.html'),'utf8');
const m=html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if(!m)throw new Error('No se encontró el bloque JSX en src/index.html');
const js=require('esbuild').transformSync(m[1],{loader:'jsx',minify:true,target:'es2019'}).code;
fs.writeFileSync(path.join(www,'app.js'),js);
html=html.replace(m[0],()=>'<script src="app.js"></script>')
 .replace(/<link href="https:\/\/fonts[^>]*>\s*/,'')
 .replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^>]*><\/script>\s*/,'<link rel="stylesheet" href="tailwind.css">\n')
 .replace(/<script>tailwind\.config[^<]*<\/script>\s*/,'')
 .replace(/<script src="https:\/\/cdnjs[^"]*\/react\/[^"]*"><\/script>/,'<script src="vendor/react.js"></script>')
 .replace(/<script src="https:\/\/cdnjs[^"]*\/react-dom\/[^"]*"><\/script>/,'<script src="vendor/react-dom.js"></script>')
 .replace(/<script src="https:\/\/cdnjs[^"]*\/jszip\/[^"]*"><\/script>/,'<script src="vendor/jszip.js"></script>')
 .replace(/<script src="https:\/\/cdnjs[^"]*\/jspdf\/[^"]*"><\/script>/,'<script src="vendor/jspdf.js"></script>')
 .replace(/<script src="https:\/\/cdnjs[^"]*babel[^"]*"><\/script>\s*/,'');
if(/https:\/\/(cdn|fonts)/.test(html))console.warn('Aviso: quedan referencias externas en index.html');
fs.writeFileSync(path.join(www,'index.html'),html);
cp.execSync('npx --no-install tailwindcss -c tailwind.config.js -i src/tailwind.css -o www/tailwind.css --minify',{cwd:root,stdio:'inherit'});
console.log('Listo: carpeta www/ generada');
