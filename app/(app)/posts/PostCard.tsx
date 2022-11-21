import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import moment from "moment";

export interface PostCardProps {
  title: string;
  description: string;
  rating: string;
  image: string | StaticImageData;
  link: string;
  author: {
    name: string;
    image?: string | StaticImageData;
  };
  date: Date | string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  rating,
  image,
  link,
  author,
  date,
}) => {
  return (
    <div className="block overflow-hidden box-border rounded-xl bg-gray-800 shadow-xl relative z-0">
      <Link href={link}>
        <Image
          src={image}
          alt=""
          width={1000}
          height={256}
          className="h-56 w-full object-cover"
        />
      </Link>
      {rating ? (
        <div className="inline-flex h-5 text-xs px-2 uppercase cursor-default items-center justify-center w-auto rounded-full overflow-hidden bg-gradient-to-r from-primary-700 to-primary-500 text-white font-bold absolute top-3 right-3">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {rating}
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className="p-4">
        <h1 className="font-bold text-xl text-primary-100">{title}</h1>
        <p className="mt-1 font-extralight text-ellipsis whitespace-nowrap overflow-hidden">
          {/*
            Convert HTML to plain text
            https://stackoverflow.com/questions/63574937/how-to-convert-html-string-into-plain-text-in-react
          */}
          {description.replace(/<[^>]+>/g, "")}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="inline-flex items-center space-x-2">
            <Image
              src={author.image ?? ""}
              alt="Author Picture"
              className="w-8 h-8 object-cover rounded-full"
            />
            <p className="font-semibold">{author.name}</p>
          </div>
          <span className="text-sm font-mono text-gray-500">
            {moment(date).format("MMM D YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
