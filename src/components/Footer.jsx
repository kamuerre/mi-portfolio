export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span>
        © {year} Camila Rasnosky
      </span>
    </footer>
  );
}
