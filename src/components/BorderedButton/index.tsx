import { useTranslation } from "@frontend/context/TranslationContext";
import "./index.scss";

const BorderedButton: React.FC<{
  text?: string;
  icon?: string;
  className?: string;
  onClick: React.MouseEventHandler;
  type?: "normal" | "green" | "red";
}> = ({ icon, text, onClick, className, type = "normal" }) => {
  const { t } = useTranslation();

  return (
    <button
      className={
        "bordered-btn" +
        (icon ? " iconned" : "") +
        (type === "green" ? " green" : type === "red" ? " red" : "") +
        (className ? " " + className : "")
      }
      onClick={onClick}
    >
      {t(text ?? "")}
      {icon && <img src={icon} />}
    </button>
  );
};

export default BorderedButton;
