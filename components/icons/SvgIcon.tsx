import MetaMask from "../../assets/metamask.svg";
import WalletConnect from "../../assets/walletconnect.svg";
import Twitter from "../../assets/twitter.svg";
import TwitterFill from "../../assets/twitter-fill.svg";
import GitHub from "../../assets/github.svg";

const SvgIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "MetaMask":
      return <MetaMask className={className} />;
    case "GitHub":
      return <GitHub className={className} />;
    case "WalletConnect":
      return <WalletConnect className={className} />;
    case "TwitterFill":
      return <TwitterFill className={className} />;
    case "Twitter":
      return <Twitter className={className} />;
    default:
      return null;
  }
};

export default SvgIcon;
