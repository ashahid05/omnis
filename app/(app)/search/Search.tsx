"use client";

import Button from "@app/Button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Search() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        placeholder="Enter search term"
        onChange={(e) => setSearch(e.target.value)}
        className="bg-cool-gray-800 outline-0 p-2 rounded-md mb-2"
      />
      <Button color="primary" type="submit">
        Search
      </Button>
    </form>
  );
}

export default Search;
