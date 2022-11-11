import React from "react";
import { Post } from "#types";
import Link from "next/link";
import Image from "next/image";
import DummyImage from "public/images/dummy-pfp.jpeg";

const PostUI: React.FC<Post> = ({
  rating,
  title,
  author,
  content,
  author_id,
}) => {
  return (
    <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 bg-cool-gray-900 rounded-xl shadow-2xl text-gray-50">
      <div className="w-full mx-auto space-y-4 text-center">
        {rating && (
          <p className="text-xs font-semibold tracking-wider uppercase">
            #{rating}
          </p>
        )}
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="text-sm text-gray-400">
          <span>
            by{" "}
            <Link
              rel="noopener noreferrer"
              href={`/users/${author_id}`}
              target="_blank"
              className="underline text-primary-400"
            >
              {author.name}
            </Link>
          </span>{" "}
          on <time dateTime="2022-2-12">Feb 12th 2022</time>
        </p>
      </div>
      <div className="text-gray-100">
        <p>{content}</p>
      </div>
      <div className="pt-12 border-t border-gray-700">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <Image
            src={DummyImage}
            width={512}
            height={512}
            alt=""
            className="self-center object-cover flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-700"
          />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{author.name}</h4>
            <p className="text-gray-400">
              Sed non nibh iaculis, posuere diam vitae, consectetur neque.
              Integer velit ligula, semper sed nisl in, cursus commodo elit.
              Pellentesque sit amet mi luctus ligula euismod lobortis ultricies
              et nibh.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostUI;
