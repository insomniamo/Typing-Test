import React from "react";

import "./footer.scss";

import FooterMenu from "@components/Footer/FooterMenu.jsx";
import FooterResults from "@components/Footer/FooterResults.jsx";

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__row">
                    <FooterResults />
                    <FooterMenu />
                </div>
            </div>
        </footer>
    );
}