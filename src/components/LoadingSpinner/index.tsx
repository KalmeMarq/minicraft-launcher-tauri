import "./index.scss";

const LoadingSpinner: React.FC<{
  style?: React.CSSProperties;
  message?: string;
}> = ({ style, message = "Coming soon..." }) => {
  return (
    <div style={Object.assign({ position: "relative", height: "100%" }, style)}>
      <div className="nloader">
        <div className="nloaders nloader1"></div>
        <div className="nloaders nloader2"></div>
        <div className="nloaders nloader4"></div>
        <div className="nloaders nloader3"></div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
