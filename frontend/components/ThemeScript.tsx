export const THEME_SCRIPT = `(function(){
  var k='boss-theme';
  var t=localStorage.getItem(k);
  if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);return;}
  if(window.matchMedia('(prefers-color-scheme:light)').matches)
    document.documentElement.setAttribute('data-theme','light');
  else
    document.documentElement.setAttribute('data-theme','dark');
})();`;

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
      suppressHydrationWarning
    />
  );
}
