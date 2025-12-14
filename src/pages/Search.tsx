import { useSearchParams } from "react-router-dom";

import SearchResult from "@/components/modules/search";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  return <SearchResult q={q} />;
};

export default SearchPage;
