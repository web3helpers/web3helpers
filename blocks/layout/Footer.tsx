import SvgIcon from "components/icons/SvgIcon";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-4 mb-2">
        <a href="" className="bg-[#1da1f2] text-white rounded-md p-3">
          <SvgIcon name="TwitterFill" className="inline w-4 h-4 fill-white mr-2" />
          Twitter
        </a>
        <a
          href="https://github.com/stonega/web3tools"
          target="_blank"
          className="bg-[#24292F] text-white rounded-md p-3"
          rel="noreferrer"
        >
          <SvgIcon name="GitHub" className="inline w-4 h-4 fill-white mr-2" />
          GitHub
        </a>
      </div>
      <span className="mb-4 text-center text-gray-500">© 2022 Web3Helpers</span>
    </div>
  );
};

export default Footer;
