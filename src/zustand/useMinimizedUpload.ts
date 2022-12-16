import create from "zustand"

interface MiniEmailUpload {
  id: number,
  files: {
    percentage: number,
    file: File,
    type: string,
    url: string,
  }[],
}

interface UploadProps {
  emails: MiniEmailUpload[],
  setEmail: (file) => void,
  setFiles: (emailIdx: number, file: any) => void,
  setPercentage: (percent: number, emailIdx: number, fileIdx: number, type?: string, url?: string) => void,
  deleteEmail: (emailIndex: number) => void;
}

const useMinimizedUpload = create<UploadProps>((set, get) => ({
  emails: [],
  setEmail(file) {
    return set((state) => {
      if(state.emails.length > 0) {
        return state.emails[state.emails.length] = file
      }
      return state.emails[0] = file
    })
  },
  deleteEmail(emailIndex) {
    return set((state) => {
      state.emails.splice(emailIndex, 1)
      console.log(state.emails)
      return {
        emails: [...state.emails]
      }
    })
  },
  setFiles(emailIdx, files) {
    return set((state) => {
      state.emails[emailIdx]["files"] = [
        ...state.emails[emailIdx]?.files ?? [],
        ...files,
      ]
      console.log(state.emails[emailIdx].files)
      return state
    })
  },
  setPercentage(percent, emailIdx: number, fileIdx: number, type?: string, url?: string) {
    return set((state) => {
      // set file
      state.emails[emailIdx].files[fileIdx] = {
        ...state.emails[emailIdx].files[fileIdx],
        percentage: percent,
        type: type ?? '',
        url: url ?? '',
      }

      state.emails[emailIdx] = { 
        ...state.emails[emailIdx],
        files: [ 
          ...state.emails[emailIdx].files
        ]
      }

      return {
        emails: [
          ...state.emails
        ]
      }
    })
  }
}))
 
export default useMinimizedUpload;