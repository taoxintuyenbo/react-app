import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../../services/PostService"; // Ensure this path is correct

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await PostService.getPostBySlug(slug);
        console.log("Post detail data:", response);
        setPost(response.post);
      } catch (error) {
        console.error("Failed to fetch post detail", error);
      }
    };

    fetchPostDetail();
  }, [slug]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading post details...</p>
      </div>
    );
  }

  const { title, content, description, thumbnail, created_at, updated_at } =
    post;

  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      {/* Title Section */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        {description && <p className="text-lg text-gray-600">{description}</p>}
      </header>

      {/* Thumbnail Image */}
      {thumbnail && (
        <div className="mb-8 text-center">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content Section */}
      <section className="mb-8">
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </section>

      {/* Metadata Section */}
      <section className="bg-gray-50 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong className="font-medium text-gray-600">Created At:</strong>{" "}
            {new Date(created_at).toLocaleDateString()}{" "}
            {new Date(created_at).toLocaleTimeString()}
          </p>
          <p>
            <strong className="font-medium text-gray-600">Updated At:</strong>{" "}
            {new Date(updated_at).toLocaleDateString()}{" "}
            {new Date(updated_at).toLocaleTimeString()}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
