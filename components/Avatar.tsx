import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Avatar = ({ src }: { src?: string }) => {
  return src ? (
    <Image
      src={src}
      alt="avatar"
      className="rounded-full"
      height={40}
      width={40}
    />
  ) : (
    <FaUserCircle size={24} />
  );
};

export default Avatar;