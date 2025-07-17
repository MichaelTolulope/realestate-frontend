import React, { useEffect, useState } from 'react'
import RequestTable from '../components/RequestTable'
import NotesModal from '../components/NotesModal'
import { FaSearch } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import supabase from '../util/supabase'

const PAGE_SIZE = 10

const UserRequests = () => {
  const { theme } = useTheme()
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [NotesModalInfo, setNotesModalInfo] = useState({ open: false, request: null })

  const fetchRequests = async () => {
    setIsLoading(true)
    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { count } = await supabase
      .from('prospectResponse')
      .select('*', { count: 'exact', head: true })

    const { data, error } = await supabase
      .from('prospectResponse')
      .select('id, propertyId, name, email, phone, message, created_at, status, adminNote')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) console.error('Error:', error.message)
    else {
      setRequests(data)
      setTotalPages(Math.ceil(count / PAGE_SIZE))
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchRequests()
  }, [currentPage])

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase())

  const filteredRequests = requests.filter((r) =>
    (r.name?.toLowerCase?.() || '').includes(search) ||
    (r.email?.toLowerCase?.() || '').includes(search) ||
    (r.phone ? String(r.phone).toLowerCase() : '').includes(search) ||
    (r.message?.toLowerCase?.() || '').includes(search)
  )

  return (
    <div className='max-w-full'>
      <div className="flex justify-between items-center px-3 mt-3 mb-5 flex-wrap gap-3 overflow-hidden">
        <h2 className="text-[20px] font-bold">User Requests</h2>
        <div className="flex items-center gap-4">
          <div className={`flex items-center rounded-3xl gap-3 pl-2 pr-4 py-2 w-[220px] border-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <FaSearch className="text-gray-500" />
            <input
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="w-full outline-none bg-transparent"
            />
          </div>
          <button onClick={fetchRequests} className="px-4 py-2 bg-black text-white rounded-xl text-sm ">
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <RequestTable
          requests={filteredRequests}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          fetchRequests={fetchRequests}
          onEditNote={(req) => setNotesModalInfo({ open: true, request: req })}
        />
      </div>

      {NotesModalInfo.open && (
        <NotesModal
          request={NotesModalInfo.request}
          onClose={() => setNotesModalInfo({ open: false, request: null })}
          onSave={() => {
            fetchRequests()
            setNotesModalInfo({ open: false, request: null })
          }}
        />
      )}
    </div>
  )
}

export default UserRequests
