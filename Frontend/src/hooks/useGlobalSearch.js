import { useState, useMemo } from "react";
import applicationsData from "../pages/applications/data/applicationsData";

export function useGlobalSearch(initialData = null) {
  const [searchQuery, setSearchQuery] = useState("");

  const dataToSearch = useMemo(() => {
    if (initialData && Array.isArray(initialData) && initialData.length > 0) {
      return initialData;
    }
    return applicationsData;
  }, [initialData]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return dataToSearch.filter((item) => {
      const company = typeof item.company === "object" ? item.company.name || "" : item.company || "";
      const role = item.role || item.title || "";
      const status = item.status || "";
      const location = item.location || "";

      return (
        company.toLowerCase().includes(q) ||
        role.toLowerCase().includes(q) ||
        status.toLowerCase().includes(q) ||
        location.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, dataToSearch]);

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    hasResults: searchResults.length > 0,
    isSearching: searchQuery.trim().length > 0,
    clearSearch,
  };
}

export default useGlobalSearch;
