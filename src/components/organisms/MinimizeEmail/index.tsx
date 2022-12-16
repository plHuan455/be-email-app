import { uploadFile } from "@api/uploadFile";
import WindowActions from "@components/molecules/WindowActions";
import { Box, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { rem } from "@utils/functions";
import useMinimizedUpload from "@zustand/useMinimizedUpload";
import { useEffect } from "react";

interface MinimizeEmailProps {
  title: string;
  index: number;
  data?: any,
  onUploading?: (state: boolean) => void;
  onMaximizeClick: () => void;
  onCloseClick: () => void;
}

const MinimizeEmail: React.FC<MinimizeEmailProps> = ({ 
  title,
  index,
  data,
  onUploading,
  onMaximizeClick, 
  onCloseClick 
}) => {
  const { emails, setPercentage } = useMinimizedUpload()
  const files = emails[index]?.files
  
  const handleUploadFiles = async() => {
    files?.forEach(async(file, fileIdx) => {
      try {
        if(file.percentage < 100) {
          const res = await uploadFile(file?.file)
          console.log(fileIdx)
          setPercentage(100, index, fileIdx, undefined, res.data)
        }
      } catch(e) {
        console.log(e)
        setPercentage(100, index, fileIdx, 'error')
      }
    })  
  }

  useEffect(() => {
    console.log(emails)
  }, [emails])

  useEffect(() => {
    handleUploadFiles()
  }, [])

  return <Box
    className="o-minimizeEmail"
    display="flex"
    alignItems="center"
  >
    <Typography
      variant="body1"
      className="o-minimizeEmail_text"
      sx={{
        width: rem(246),
        py: rem(8),
        flexGrow: 1,
        fontSize: rem(14),
        fontWeight: 500,
        lineHeight: rem(30),
        marginLeft: rem(16),
        flexWrap: 'nowrap'
      }}
    >
      {title}
    </Typography>
    <Box flexShrink={1} sx={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
      { emails.length > 0 && <Typography>{ `${emails[index]?.files?.filter(file => file?.percentage === 100)?.length}/${emails[index]?.files?.length}` }</Typography> }
      <WindowActions onMaximizeClick={onMaximizeClick} onCloseClick={onCloseClick} />
    </Box>
  </Box>
}

export default MinimizeEmail