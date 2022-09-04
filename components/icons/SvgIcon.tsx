import MetaMask from "assets/metamask.svg";
import WalletConnect from "assets/walletconnect.svg";
import Twitter from "assets/twitter.svg";
import TwitterFill from "assets/twitter-fill.svg";
import GitHub from "assets/github.svg";
import Bitcoin from "assets/bitcoin.svg";
import Ethereum from 'assets/ethereum.svg'
import Solana from 'assets/solana.svg'
import Filecoin from 'assets/filecoin.svg'
import Polygin from 'assets/polygon.svg'

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
    case "Bitcoin":
      return <Bitcoin className={className} />;
    case "Ethereum":
      return <Ethereum className={className} />;
    case "Polygon":
      return <Polygin className={className} />;
    case "Solana":
      return <Solana className={className} />;
    case "Filecoin":
      return <Filecoin className={className} />;
    default:
      return null;
  }
};

export default SvgIcon;
