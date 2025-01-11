import { useState } from 'react';
import { UploadZone } from './UploadZone';
import { ArrowLeft, Lock, Split, Unlock } from 'lucide-react';
import { TTool } from '../types';

interface ConversionToolProps {
  selectedTool: TTool;
  file: File | null;
  setFile: (file: File | null) => void;
  onBack: () => void;
}

export function ConversionTool({ selectedTool, file, setFile, onBack }: ConversionToolProps) {
  const [mergingFiles, setMergingFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  if (!selectedTool) return null;

  // @ts-expect-error e needed sometimes
  async function handleSubmit(e) {

    if (e) e.preventDefault()
    console.log('selectedTool', selectedTool);

    if (!file || !selectedTool) return;

    setIsLoading(true);
    setError(null);
    setConvertedFile(null);

    try {
      const formdata = new FormData()
      formdata.append('tool', JSON.stringify(selectedTool))
      formdata.append('file', file)

      if (mergingFiles.length > 1) {
        mergingFiles.shift()
        mergingFiles.forEach((file, i) => formdata.append(`mergingfile${i + 1}`, file))
      }

      if (selectedTool.taskType === 'protect') formdata.append('password', e.target.password.value)
      if (selectedTool.taskType === 'split') formdata.append('splitRange', `${e.target.from.value}-${e.target.to.value}`)

      const res = await fetch('/api', {
        method: "POST",
        body: formdata,
      })

      const result = await res.blob()
      console.log('buffer', result);
      setConvertedFile(result);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  function downloadConvertedFile() {
    if (convertedFile && selectedTool) {
      const url = URL.createObjectURL(convertedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pdfkit.${selectedTool.taskType === 'pdfjpg' ? 'jpg' : selectedTool.taskType === 'extract' ? 'txt' : ""}`
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
        {selectedTool.title}
      </h3>
      <UploadZone
        onFileSelect={setFile}
        acceptedTypes={selectedTool.acceptedTypes}
        selectedTool={selectedTool}
        setMergingFiles={setMergingFiles}
      />
      {file && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Selected file: <span className="font-medium">{file.name}</span>
            {mergingFiles.map((mergingFile, i) =>
              <span className="font-medium" key={i}> , {mergingFile.name}</span>
            )}
          </p>
          {selectedTool.taskType === 'protect' ?
            <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 mt-3'>
              <input
                className='px-3 appearance-none py-1  border-2 border-gray-400 rounded-xl'
                placeholder='Enter you password here'
                name="password"
                required={true}
              />
              <button
                className=" px-3 py-1 flex gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                type='submit'
                disabled={isLoading}
              >
                <Lock className='w-4 mb-1 ' />
                {isLoading ? 'Locking...' : 'Lock'}
              </button>
            </form>
            : selectedTool.taskType === 'unlock' ?
              <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 mt-3'>
                <input
                  className='px-3 appearance-none py-1  border-2 border-gray-400 rounded-xl'
                  placeholder='Enter you password here'
                  name="password"
                  required={true}
                />
                <button
                  className=" px-3 py-1 flex gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  type='submit'
                  disabled={isLoading}
                >
                  <Unlock className='w-4 mb-1 ' />
                  {isLoading ? 'Unlocking...' : 'Unlock'}
                </button>
              </form>
              : selectedTool.taskType === 'split' ?
                <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 mt-3 text-black'>
                  <label
                    htmlFor="from"
                    className='flex gap-3 items-center justify-center w-fit'
                  >
                    <p>From:</p>
                    <input type="number" name="from" id="from"
                      className='px-3 appearance-none py-1  border-2 w-[87px] border-gray-400 rounded-xl'
                      required={true}

                    />
                  </label>

                  <label
                    htmlFor="to"
                    className='flex gap-3 items-center justify-center w-fit'
                  >
                    <p>To:</p>
                    <input type="number" name="to" id="to"
                      className='px-3 appearance-none py-1  border-2 w-[87px] border-gray-400 rounded-xl'
                      required={true}

                    />
                  </label>

                  <button
                    className=" px-3 py-1 flex gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    type='submit'
                    disabled={isLoading}
                  >
                    <Split className='w-4 mb-1 ' />
                    {isLoading ? 'Splitting...' : 'Split'}
                  </button>
                </form>
                :
                <button
                  className="mt-4 px-8 py-3  bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Converting...' : 'Convert Now'}
                </button>
          }
        </div>
      )}
      {convertedFile && (
        <div className="mt-4 flex items-center">
          <button
            className="mt-4 mx-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={downloadConvertedFile}
          >
            Download  File
          </button>
        </div>
      )}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        className="mt-8 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
        onClick={() => {
          onBack();
          setFile(null)
          setMergingFiles([])
        }}
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to all tools
      </button>
    </div>
  );
}

