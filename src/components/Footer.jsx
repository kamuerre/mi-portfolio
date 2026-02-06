export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__inner">
                <span className="footer__text">
                    © 2026 Camila Rasnosky
                </span>
            </div>
        </footer>
    );
}
