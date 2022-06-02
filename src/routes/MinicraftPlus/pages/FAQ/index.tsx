import LoadingSpinner from "@frontend/components/LoadingSpinner";
import { SettingsContext } from "@frontend/context/SettingsContext";
import { useContext } from "react";
import "./index.scss";

const faqs: { id: string; question: string; answer: string }[] = [
  {
    id: "f39765f19dea",
    question: "The game says I need Java",
    answer:
      'Download Java from <a href="www.java.com" target="_blank" rel="noopener noreferrer">www.java.com</a> and install it to be able to run Minicraft+.',
  },
  {
    id: "4787ea8b946d",
    question: "How do I set up a Minicraft+ server?",
    answer:
      'Please see <a href="https://discord.com/channels/280723930942013440/693770499297116271" target="_blank" rel="noopener noreferrer">😕｜how-to-make-a-server</a>.',
  },
  {
    id: "67081208f36d",
    question: "I want to find out more information about Minicraft+.",
    answer:
      'Please see <a href="https://playminicraft.com/" target="_blank" rel="noopener noreferrer">https://playminicraft.com</a> for more info about the game.',
  },
  {
    id: "34a6082f4b86",
    question: "I'm still having problems launching the game.",
    answer:
      'If turning your PC off and on again doesn\'t fix it, please ask your question at <a href="https://discord.com/channels/280723930942013440/280723930942013440" target="_blank" rel="noopener noreferrer">💬｜minicraft-chat</a>, and hopefully a server member will be able to help you.',
  },
];

const FAQ = () => {
  const { animatePages } = useContext(SettingsContext);

  return (
    <div className={`sub-page ${animatePages ? "anim" : ""} faq`}>
      <div className="content">
        <h2>Frequently asked questions</h2>
        <p className="faq-info">
          Here are some frequently asked questions about Minicraft+ and a few
          tips on how to resolve the problems.
        </p>
        <br />
        <div className="faq-list">
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              <div className="faq-item__question">
                <span>Q</span>
                <div>{faq.question}</div>
              </div>
              <div className="faq-item__answer">
                <span>A</span>
                <div
                  className="faq-answer"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
