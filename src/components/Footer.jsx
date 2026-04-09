export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__text">© {year} Camila Rasnosky</span>
      </div>
    </footer>
  );
}
