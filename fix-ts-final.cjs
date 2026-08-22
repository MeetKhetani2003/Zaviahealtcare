const fs = require('fs');
const path = require('path');

const file = (p) => path.join(__dirname, p);
const read = (p) => fs.readFileSync(file(p), 'utf8');
const write = (p, c) => fs.writeFileSync(file(p), c, 'utf8');

// 1. Fix layout.tsx
try {
  let lo = read('src/components/layout.tsx');
  lo = lo.replace('const { pathname } = useLocation();', 'const pathname = usePathname();');
  write('src/components/layout.tsx', lo);
} catch (e) {
  console.error("layout.tsx error", e);
}

// 2. Fix free-assessment/page.tsx Button disabled error
try {
  let fa = read('src/app/free-assessment/page.tsx');
  fa = fa.replace(/<Button type="submit" size="lg" className="w-full sm:w-auto" disabled=\{isSubmitting\}>/, '<button type="submit" className="w-full sm:w-auto bg-forest-900 text-white rounded-xl py-4 px-8 font-bold disabled:opacity-70" disabled={isSubmitting}>');
  fa = fa.replace(/<\/Button>\s*\{submitError/, '</button>\n                    {submitError');
  write('src/app/free-assessment/page.tsx', fa);
} catch (e) {
  console.error("free-assessment error", e);
}

console.log("Done");
