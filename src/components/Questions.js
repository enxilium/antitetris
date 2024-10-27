import React from 'react';
import "./Questions.css";

export const questions = [
    ["Is this link malicious: 'www.gooqle.com'", 1],
    ["Is this link malicious: 'www.paypal.com'", 0],
    ["Is this link malicious: 'www.amaz0n.com'", 1],
    ["Is this link malicious: 'www.microsoft.com'", 0],
    ["Is this link malicious: 'www.facebok.com'", 1],
    ["Is this link malicious: 'www.github.com'", 0],
    ["Is this link malicious: 'www.ebay.com'", 0],
    ["Is this link malicious: 'www.y0utube.com'", 1],
    ["Is this link malicious: 'www.apple.com'", 0],
    ["Is this link malicious: 'www.paypall.com'", 1],
    ["Is this link malicious: 'www.go0gle.com'", 1],
    ["Is this link malicious: 'www.twitter.com'", 0],
    ["Is this link malicious: 'www.instagr4m.com'", 1],
    ["Is this link malicious: 'www.linkedin.com'", 0],
    ["Is this link malicious: 'www.walmart.com'", 0],
    ["Is this link malicious: 'www.ebayk.com'", 1],
    ["Is this link malicious: 'www.reddit.com'", 0],
    ["Is this link malicious: 'www.pint3rest.com'", 1],
    ["Is this link malicious: 'www.0range.com'", 1],
    ["Is this link malicious: 'www.oreilly.com'", 0],
    ["Is this link malicious: 'www.snapch4t.com'", 1],
    ["Is this link malicious: 'www.y0utubevideo.com'", 1],
    ["Is this link malicious: 'www.tesla.co'", 0],
    ["Is this link malicious: 'www.goog1e.com'", 1],
    ["Is this link malicious: 'www.bestbuyy.com'", 1],
    ["Is this link malicious: 'www.microsoft-login.com'", 1],
    ["Is this link malicious: 'www.amazon-web.com'", 1],
    ["Is this link malicious: 'www.f4cebook.com'", 1],
    ["Is this link malicious: 'www.appleidsecure.com'", 1],
    ["Is this link malicious: 'www.dropboxfiles.com'", 1],
    ["Is this link malicious: 'www.goggle.com'", 1],
    ["Is this link malicious: 'www.mail.gmial.com'", 1],
];


const Questions = ({ currentQuestion }) => {
    return (
        <div className="Questions">
            <h3>Cyber Security Question:</h3>
            <p>{currentQuestion}</p>
            <div className="instructions">
                <p>Type <span className="key">2</span> for <span className="answer">Yes</span></p>
                <p>Type <span className="key">3</span> for <span className="answer">No</span></p>
            </div>
        </div>
    );
};

export default Questions;
