import React, { useState } from 'react'
import supabase from '../util/supabase'

const NoteModal = ({ request, onClose, onSave }) => {
  const [note, setNote] = useState(request.adminNote || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const { error } = await supabase
      .from('prospectResponse')
      .update({ adminNote: note })
      .eq('id', request.id)
    if (error) console.error('Failed to save note:', error.message)
    setIsSaving(false)
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Edit Note for {request.name}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 border rounded p-2 bg-white dark:bg-gray-700 dark:text-white"
          placeholder="Internal admin note..."
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={isSaving} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal
