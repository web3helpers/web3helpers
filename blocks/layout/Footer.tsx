import SvgIcon from "components/icons/SvgIcon";

const Footer = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-[#1da1f2] text-white rounded-sm p-2">
        <SvgIcon
          name="TwitterFill"
          className="inline w-4 h-4 fill-white mr-2"
        />
        Twitter
      </div>
      <div className="bg-[#24292F] text-white rounded-sm p-2">
        <SvgIcon name="GitHub" className="inline w-4 h-4 fill-white mr-2" />
        GitHub
      </div>
    </div>
  );
};

export default Footer;
