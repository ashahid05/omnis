"use client";
import Utils from "#utils";
import Button from "@app/Button";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as yup from "yup";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is a required field")
    .min(5, "Titles must be at least 5 characters")
    .max(30, "Titles must be at most 30 characters"),
  content: yup
    .string()
    .required("You must write a content for people to see huh?")
    .min(50, "Post content must be at least 50 characters"),
  rating: yup
    .string()
    .notRequired()
    .min(3, "Ratings must be at least 3 characters")
    .max(10, "Ratings must be at most 10 characters"),
  image: yup.mixed().required("Thumbnail is a required field"),
});

function CreatePostPage() {
  const formik = useFormik({
    initialValues: { title: "", rating: "", content: "", image: undefined },
    onSubmit: (values) => {
      console.log("Submitted", values);
    },
    validationSchema,
  });

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              Create a new post
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <p className="mt-4 text-sm font-bold text-gray-400">
              Please note: Posts gets deleted automatically after 24 hours
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="space-y-6 rounded-t-lg bg-cool-gray-900 px-4 py-6 sm:p-6">
                <div className="flex flex-col max-w-full">
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold ",
                      formik.errors.title ? "text-red-500" : "text-gray-200"
                    )}
                  >
                    <span className="text-sm leading-5">Title</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Type here"
                    maxLength={30}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    className={Utils.concat(
                      "transition duration-200 ease-in-out h-12 px-4 text-base border rounded-lg w-auto bg-cool-gray-800 placeholder-gray-400 text-white outline-none",
                      formik.errors.title
                        ? "border-red-400"
                        : "border-gray-600 focus:border-primary-500"
                    )}
                  />
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.title ? "text-rose-600" : "text-gray-500"
                    )}
                  >
                    <span className="text-xs leading-4">
                      {formik.errors.title ??
                        "Titles can be up to 30 characters"}
                    </span>
                  </label>
                </div>
                <div className="flex flex-col max-w-full">
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.content ? "text-red-500" : "text-gray-200"
                    )}
                  >
                    <span className="text-sm leading-5">Content</span>
                  </label>
                  <Editor
                    initialContent={formik.values.content}
                    onChange={(newContent) => {
                      formik.setFieldValue("content", newContent);
                    }}
                  />
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 text-gray-500 font-semibold",
                      formik.errors.content ? "text-rose-600" : "text-gray-500"
                    )}
                  >
                    <span className="text-xs leading-4">
                      {formik.errors.content ?? "Up to 512 characters"}
                    </span>
                  </label>
                </div>
                <div className="flex flex-col max-w-full">
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.rating ? "text-red-500" : "text-gray-200"
                    )}
                  >
                    <span className="text-sm leading-5">Rating</span>
                  </label>
                  <input
                    id="rating"
                    type="text"
                    maxLength={10}
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    className={Utils.concat(
                      "transition duration-200 ease-in-out h-12 px-4 text-base border rounded-lg w-auto bg-cool-gray-800 placeholder-gray-400 text-white outline-none",
                      formik.errors.rating
                        ? "border-red-400"
                        : "border-gray-600 focus:border-primary-500"
                    )}
                  />
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.rating ? "text-rose-600" : "text-gray-500"
                    )}
                  >
                    <span className="text-xs leading-4">
                      {formik.errors.rating ??
                        "Ratings can be up to 10 characters"}
                    </span>
                  </label>
                </div>
                <div className="flex flex-col max-w-full">
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.image ? "text-red-500" : "text-gray-200"
                    )}
                  >
                    <span className="text-sm leading-5">Thumbnail</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(event) => {
                      const file = event.target.files && event.target.files[0];
                      if (!file) return;

                      const size = file.size / 1000 / 1000; // mb
                      const maxSize = 12;
                      // image is bigger than 12 megabytes
                      if (size > maxSize) {
                        formik.setFieldError(
                          "image",
                          `Thumbnail is too large, Maximum size is ${maxSize} MB.`
                        );
                        event.currentTarget.value = "";
                      } else {
                        formik.setFieldValue("image", file);
                      }
                    }}
                    className={Utils.concat(
                      "block h-18 w-auto text-sm rounded-lg border transition duration-200 ease-in-out cursor-pointer text-gray-400 outline-none bg-cool-gray-900 border-gray-600 placeholder-gray-400 focus:border-primary-500",
                      "file:mr-3 file:p-2 file:px-6 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-cool-gray-800 file:text-gray-400 file:outline-none"
                    )}
                  />
                  <label
                    className={Utils.concat(
                      "flex select-none items-center justify-between px-2 py-1 font-semibold",
                      formik.errors.image ? "text-rose-600" : "text-gray-500"
                    )}
                  >
                    <span className="text-xs leading-4">
                      {formik.errors.image ??
                        "Thumbnail can have a maximum size of 12Mb"}
                    </span>
                  </label>
                  <Thumb file={formik.values.image} />
                </div>
              </div>
              <div className="bg-cool-gray-800 px-4 py-3 flex justify-end rounded-b-lg sm:px-6">
                <Button
                  type="submit"
                  disabled={Object.values(formik.errors).length !== 0}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const Thumb: React.FC<{ file: File | undefined }> = ({ file }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image?.toString()}
      alt={file?.name}
      className="h-56 w-full object-cover border-cool-gray-500 rounded-lg border mt-2"
    />
  );
};

export default CreatePostPage;
