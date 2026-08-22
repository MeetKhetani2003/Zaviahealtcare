const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replaceFn) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = replaceFn(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
}

// 1. components/cards.tsx
replaceInFile(path.join(__dirname, 'src/components/cards.tsx'), content => {
  return content.replace('import { Link } from "react-router-dom";', 'import Link from "next/link";')
                .replace(/to=/g, 'href=');
});

// 2. components/ui.tsx
replaceInFile(path.join(__dirname, 'src/components/ui.tsx'), content => {
  return content.replace('import { Link } from "react-router-dom";', 'import Link from "next/link";')
                .replace(/to=/g, 'href=');
});

// 3. app/page.tsx
replaceInFile(path.join(__dirname, 'src/app/page.tsx'), content => {
  return `"use client";\n` + content.replace('import { Link } from "react-router-dom";', 'import Link from "next/link";')
                .replace(/to=/g, 'href=');
});

// 4. app/about-doctor/page.tsx
replaceInFile(path.join(__dirname, 'src/app/about-doctor/page.tsx'), content => {
  return `"use client";\n` + content.replace('import { Link } from "react-router-dom";', 'import Link from "next/link";')
                .replace(/to=/g, 'href=');
});

// 5. app/conditions/[slug]/page.tsx
replaceInFile(path.join(__dirname, 'src/app/conditions/[slug]/page.tsx'), content => {
  let c = `"use client";\n` + content.replace('import { Link, Navigate, useParams } from "react-router-dom";', 'import Link from "next/link";\nimport { useParams, redirect } from "next/navigation";');
  c = c.replace(/to=/g, 'href=');
  c = c.replace(/<Navigate href="\/conditions" replace \/>/g, '{redirect("/conditions")}');
  return c;
});

// 6. app/treatments/[slug]/page.tsx
replaceInFile(path.join(__dirname, 'src/app/treatments/[slug]/page.tsx'), content => {
  let c = `"use client";\n` + content.replace('import { Navigate, useParams } from "react-router-dom";', 'import { useParams, redirect } from "next/navigation";');
  c = c.replace('import { Link } from "react-router-dom";', 'import Link from "next/link";');
  c = c.replace(/to=/g, 'href=');
  c = c.replace(/<Navigate href="\/treatments" replace \/>/g, '{redirect("/treatments")}');
  return c;
});

// 7. layout.tsx
replaceInFile(path.join(__dirname, 'src/components/layout.tsx'), content => {
  let c = `"use client";\n` + content.replace('import { Link, NavLink, Outlet, useLocation } from "react-router-dom";', 'import Link from "next/link";\nimport { usePathname } from "next/navigation";');
  c = c.replace(/to=/g, 'href=');
  c = c.replace(/useLocation/g, 'usePathname');
  c = c.replace(/location.pathname/g, 'pathname');
  c = c.replace(/<NavLink/g, '<Link');
  c = c.replace(/<\/NavLink>/g, '</Link>');
  // Fix Link active states
  c = c.replace(/className={\(\{ isActive \}\) =>/g, 'className={');
  c = c.replace(/isActive/g, '(pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))');
  c = c.replace(/end={item.href === "\/"}/g, '');
  c = c.replace(/<Outlet \/>/g, '{children}');
  c = c.replace(/export default function Layout\(\) {/g, 'export default function Layout({ children }: { children: React.ReactNode }) {');
  // Remove ScrollToTop component
  c = c.replace(/export function ScrollToTop\(\) {[\s\S]*?return null;\n}\n/g, '');
  c = c.replace(/<ScrollToTop \/>/g, '');
  return c;
});

console.log("Fix imports complete");
