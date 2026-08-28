import { useState, useMemo, useEffect, useCallback } from "react";
import { Plus, Briefcase, RefreshCw } from "lucide-react";

// Components
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ApplicationTable from "./components/ApplicationTable";
import ApplicationCard from "./components/ApplicationCard";
import Pagination from "./components/Pagination";
import EmptyState from "./components/EmptyState";
import AddApplicationModal from "./components/AddApplicationModal";
import EditApplicationModal from "./components/EditApplicationModal";
import DeleteApplicationModal from "./components/DeleteApplicationModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Data & Service
import applicationsDataSeed from "./data/applicationsData";
import internshipService from "../../services/internshipService";

const ITEMS_PER_PAGE = 6;

const Applications = () => {
  const [applications, setApplications] = useState(applicationsDataSeed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search / Filter / Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal visibility + selected application state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch applications from backend API (with graceful fallback to seed data)
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await internshipService.getAllInternships(1, searchQuery, statusFilter === "All" ? "" : statusFilter);
      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
        setApplications(response.data);
      }
    } catch (err) {
      console.warn("Applications API notice: using local data", err?.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Derived, filtered + sorted + searched list
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((app) => {
        const companyName = typeof app.company === "object" ? app.company.name || "" : app.company || "";
        const roleName = app.role || app.title || "";
        const locationName = app.location || "";
        return (
          companyName.toLowerCase().includes(query) ||
          roleName.toLowerCase().includes(query) ||
          locationName.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter !== "All") {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (modeFilter !== "All") {
      result = result.filter((app) => app.mode === modeFilter);
    }

    result.sort((a, b) => {
      const companyA = typeof a.company === "object" ? a.company.name || "" : a.company || "";
      const companyB = typeof b.company === "object" ? b.company.name || "" : b.company || "";
      const dateA = new Date(a.appliedDate || a.createdAt || 0);
      const dateB = new Date(b.appliedDate || b.createdAt || 0);

      switch (sortBy) {
        case "dateAsc":
          return dateA - dateB;
        case "dateDesc":
          return dateB - dateA;
        case "companyAsc":
          return companyA.localeCompare(companyB);
        case "companyDesc":
          return companyB.localeCompare(companyA);
        default:
          return 0;
      }
    });

    return result;
  }, [applications, searchQuery, statusFilter, modeFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / ITEMS_PER_PAGE));
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setModeFilter("All");
    setCurrentPage(1);
  };

  // --- CRUD API Handlers ---
  const handleAddApplication = async (newApplication) => {
    try {
      const created = await internshipService.createInternship(newApplication);
      if (created?.data) {
        setApplications((prev) => [created.data, ...prev]);
      } else {
        setApplications((prev) => [newApplication, ...prev]);
      }
    } catch {
      setApplications((prev) => [newApplication, ...prev]);
    }
  };

  const handleUpdateApplication = async (updatedApplication) => {
    const id = updatedApplication.id || updatedApplication._id;
    try {
      await internshipService.updateInternship(id, updatedApplication);
    } catch {
      // Fallback local state update
    }
    setApplications((prev) =>
      prev.map((app) => ((app.id || app._id) === id ? updatedApplication : app))
    );
  };

  const handleDeleteApplication = async (id) => {
    try {
      await internshipService.deleteInternship(id);
    } catch {
      // Fallback local state update
    }
    setApplications((prev) => prev.filter((app) => (app.id || app._id) !== id));
  };

  const openEditModal = (application) => {
    setSelectedApplication(application);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (application) => {
    setSelectedApplication(application);
    setIsDeleteModalOpen(true);
  };

  const isFiltered = searchQuery.trim() !== "" || statusFilter !== "All" || modeFilter !== "All";

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white sm:text-2xl">
              Applications
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-[46px]">
            Track and manage all your internship applications in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 shadow-xs transition-all duration-200 hover:bg-indigo-700 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>

      {/* Toolbar: Search + Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <SearchBar value={searchQuery} onChange={handleFilterChange(setSearchQuery)} />
        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={handleFilterChange(setStatusFilter)}
          modeFilter={modeFilter}
          onModeChange={handleFilterChange(setModeFilter)}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Content Area */}
      {loading ? (
        <LoadingSpinner label="Fetching applications..." />
      ) : paginatedApplications.length > 0 ? (
        <>
          <ApplicationTable
            applications={paginatedApplications}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
            {paginatedApplications.map((app) => (
              <ApplicationCard
                key={app.id || app._id}
                application={app}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredApplications.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      ) : (
        <EmptyState
          isFiltered={isFiltered}
          onAddClick={() => setIsAddModalOpen(true)}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Modals */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddApplication}
      />

      <EditApplicationModal
        key={selectedApplication?.id || selectedApplication?._id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateApplication}
        application={selectedApplication}
      />

      <DeleteApplicationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteApplication}
        application={selectedApplication}
      />
    </div>
  );
};

export default Applications;
