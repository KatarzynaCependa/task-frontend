import end from "../../assets/end.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <p className="footer">This is all I've got for you :)</p>
      <div>
        <img src={end} alt="Nothing to do here" />
      </div>
    </>
  );
};
