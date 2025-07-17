import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { formatDateTime } from '../util/utils'
import supabase from '../util/supabase'
import { Link } from 'react-router-dom'

const RequestTable = ({
  requests,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  fetchRequests,
  onEditNote
}) => {
  const { theme } = useTheme()
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('prospectResponse')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) console.error('Status update failed:', error.message)
    else fetchRequests()
  }

  return (
    <div className={`max-w-full rounded-lg border border-gray-200 ${bgColor} overflow-hidden`}>
      <div className="overflow-x-auto w-full">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
            </div>
            <p className={`mt-4 text-sm ${textColor}`}>Loading requests...</p>
          </div>
        ) : (
          <table className="min-w-[1200px] w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                {['ID','Property','Name','Email','Phone','Message','Date','Status','Note','Actions'].map(col => (
                  <th key={col} className={`px-4 py-2 text-left font-medium whitespace-nowrap ${textColor}`}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>{r.id}</td>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>
                    <Link to={`/properties/${r.propertyId}`} className="underline" target="_blank">{r.propertyId}</Link>
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>{r.name}</td>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>{r.email}</td>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>{r.phone}</td>
                  <td className={`px-4 py-2 max-w-[200px] truncate ${textColor}`}>{r.message}</td>
                  <td className={`px-4 py-2 whitespace-nowrap ${textColor}`}>{formatDateTime(r.created_at)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      r.status === 'feedback given' ? 'bg-green-100 text-green-800'
                        : r.status === 'contacted' ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'}`}>
                      {r.status || 'pending'}
                    </span>
                  </td>
                  <td className={`px-4 py-2 max-w-[150px] truncate ${textColor}`}>
                    {r.adminNote || '—'}
                  </td>
                  <td className="px-4 py-2 space-x-1 flex flex-col gap-1">
                    {r.status !== 'contacted' && r.status !== 'feedback given' && (
                      <button onClick={() => updateStatus(r.id, 'contacted')} className="px-2 py-1 bg-yellow-500 text-xs text-white rounded">Contacted</button>
                    )}
                    {r.status === 'contacted' && (
                      <button onClick={() => updateStatus(r.id, 'feedback given')} className="px-2 py-1 bg-green-600 text-xs text-white rounded">Feedback</button>
                    )}
                    <button onClick={() => onEditNote(r)} className="px-2 py-1 bg-blue-500 text-xs text-white rounded">Edit Note</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!isLoading && (
        <div className="flex justify-center gap-2 p-4 border-t border-gray-200">
          <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 bg-gray-100 rounded">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1 rounded ${p === currentPage ? 'bg-black text-white' : 'bg-gray-100'}`}>{p}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 bg-gray-100 rounded">Next</button>
        </div>
      )}
    </div>
  )
}

export default RequestTable
