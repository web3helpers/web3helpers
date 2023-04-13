import SvgIcon from "components/icons/SvgIcon";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center">
      <span className="mb-2 text-center text-gray-500">© 2022 Web3Helpers</span>
      <div className="flex flex-row justify-center gap-2 mb-4">
        <a href="https://twitter.com/shimenmen" target="_blank" rel="noreferrer">
          <SvgIcon name="TwitterFill" className="inline w-6 h-6 fill-[#1da1f2] mr-2" />
        </a>
        <a href="https://github.com/stonega/web3tools" target="_blank" rel="noreferrer">
          <SvgIcon name="GitHub" className="inline w-5 h-5 fill-[#24292f] mr-2" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
