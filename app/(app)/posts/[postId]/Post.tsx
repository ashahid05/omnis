import { Post } from "@app/types";
import moment from "moment";
import Image from "next/image";
import xss from "xss";
import DummyImage from "public/images/dummy-pfp.jpeg";
import Link from "next/link";

const PostUI: React.FC<Post> = ({
  rating,
  title,
  author,
  image,
  content,
  created_at,
  author_id,
}) => {
  return (
    <>
      <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative h-96">
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10 rounded-lg"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE}/posts/${image}`}
          width={1000}
          height={256}
          alt="Post image"
          className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-lg"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          {rating && (
            <div className="inline-flex h-8 text-sm px-4 py-2 mb-2 uppercase cursor-default items-center justify-center w-auto rounded-full overflow-hidden bg-gradient-to-r from-primary-700 to-primary-500 text-white font-bold">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {rating}
              </span>
            </div>
          )}
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {title}
          </h2>
          <div className="flex mt-3">
            <Image
              src={DummyImage}
              width={512}
              height={512}
              alt="Author image"
              className="h-10 w-10 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="font-semibold text-gray-200 text-sm hover:underline">
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`/users/${author_id}`}
                >
                  {author.name}
                </Link>
              </p>
              <p className="font-semibold text-gray-400 text-xs">
                {moment(created_at).format("MMM D YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-8 text-gray-200 max-w-screen-md mx-auto text-lg leading-relaxed bg-cool-gray-900 p-4 rounded-lg post-html-content"
        dangerouslySetInnerHTML={{ __html: xss(content) }}
      ></div>
    </>
  );
};

export default PostUI;
