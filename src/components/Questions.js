import React from 'react';
import "./Questions.css";

export const questions = [
    ["Is this link malicious: 'www.gooqle.com'", 1],
    ["Is this link malicious: 'www.paypal.com'", 0],
    ["Is this link malicious: 'www.amaz0n.com'", 1],
    ["Is this link malicious: 'www.microsoft.com'", 0],
    ["Is this link malicious: 'www.facebok.com'", 1],
    ["Is this link malicious: 'www.github.com'", 0],
    ["Is this link malicious: 'www.bankofamerica.com'", 0],
    ["Is this link malicious: 'www.ebay.com'", 0],
    ["Is this link malicious: 'www.y0utube.com'", 1],
    ["Is this link malicious: 'www.apple.com'", 0]
];

const Questions = ({ currentQuestion }) => {
    return (
        <div className="Questions">
            <h3>Cyber Security Question:</h3>
            <p>{currentQuestion}</p>
        </div>
    );
};

export default React.memo(Questions);
