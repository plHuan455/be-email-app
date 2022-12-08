import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModalConfirm from 'src/components/CustomModalConfirm'
import styled from 'styled-components'
import axios from 'axios'
import appConstants from 'src/constants'
import * as storage from '../../helpers/storage'
import { useDispatch } from 'react-redux'
import FileUploadAction from 'src/redux/FileUpload/action'
import { useSelector } from 'react-redux'
import Image from 'src/components/Image'
import CircularProgress from '../File/components/MenuLeft/components/CircularProgress'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ClipLoader from 'react-spinners/ClipLoader'
import handleError from 'src/api/handle-error'
import { useLocation } from 'react-router-dom'

let cancel = {}
let statusOfListFile = {}
let currentIndexFileUpload = 0
let listFileTotal = []
const maxFileUpload = 2

const override = {
  // display: "block",
  // margin: "0 auto",
  // borderColor: "green",
}

function PopupProcessing({ isMobile }) {
  const [showModalCancelUpload, setShowModalCancelUpload] = useState(false)
  const [listFiles, setListFiles] = useState([])
  const [transform, setTransform] = useState(false)

  const dispatch = useDispatch()

  const filesData = useSelector((state) => state.fileUpload.filesUpload)
  const key = useSelector((state) => state.fileUpload.key)
  const filesProcessing = useSelector((state) => state.fileUpload.filesProcess)
  const listFileUploadDone = useSelector((state) => state.fileUpload.listFileUploadDone)

  useEffect(() => {
    if (filesData.length < 1) {
      return
    }

    for (var i in filesData) {
      statusOfListFile[filesData[i].id] = 0
    }

    const listFileTotalN = []
    for (var i = 0; i < filesData.length; i++) {
      listFileTotal.push(filesData[i])
      listFileTotalN.push(filesData[i].id)
    }

    for (var i = 0; i < maxFileUpload; i++) {
      axiosUploadFile()
    }

    setListFiles([...listFiles, ...listFileTotalN])
  }, [key])

  const cancelUpload = (id) => {
    if (id === -1) {
      for (var i in statusOfListFile) {
        if (statusOfListFile[i] === 0 || statusOfListFile[i] === 3) {
          statusOfListFile[i] = 2
        }
      }
      for (var i in cancel) {
        cancel[i] && cancel[i].abort()
        delete cancel[i]
      }
      return
    }

    if (cancel[id] && typeof cancel[id].abort === 'function') {
      cancel[id].abort()
    } else {
      statusOfListFile[id] = 2
    }
  }

  const axiosUploadFile = () => {
    if (!listFileTotal || listFileTotal.length < 1) return

    let indexFileUpload = -1
    let totalProcessing = 0
    let isCalled = false

    for (var j = 0; j < listFileTotal.length; j++) {
      var i = listFileTotal[j].id

      if (statusOfListFile[i] === 0) {
        if (indexFileUpload === -1) {
          indexFileUpload = j
        }
        continue
      }
      if (statusOfListFile[i] !== 3) {
        continue
      }
      totalProcessing++

      if (totalProcessing === maxFileUpload) {
        indexFileUpload = -1
        break
      }
    }

    if (indexFileUpload < 0) {
      return
    }

    const elm = listFileTotal[indexFileUpload]

    if (elm === null) {
      return
    }
    statusOfListFile[elm.id] = 3

    const formData = new FormData()

    formData.append('file', elm.file)
    formData.append('_fileName', elm.fileName)
    formData.append('_id', elm.id)
    formData.append('pid', elm.pid)

    const url = `${appConstants.apiUrl}/media/upload?_v=${elm.id}`

    cancel[elm.id] = new AbortController()

    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'DEVICE-CODE': storage.getDevice(),

        Authorization: 'Bearer ' + storage.getToken(),
      },

      signal: cancel[elm.id].signal,

      onUploadProgress: (progressEvent) => {
        var pers = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        if (pers >= 100) {
          if (!isCalled) {
            isCalled = true
            statusOfListFile[elm.id] = 1
            requestAnimationFrame(() => {
              axiosUploadFile()
            })
          }
          let notFinish = false
          for (var i in statusOfListFile) {
            if (statusOfListFile[i] === 1 || statusOfListFile[i] === 2) {
              continue
            }
            notFinish = true
            break
          }

          if (!notFinish) {
            // listFileTotal = []
            // statusOfListFile = {}
            // cancel = {}
            // currentIndexFileUpload = -1
          }
          pers = 100
        }

        const fileProcess = { id: elm.id, per: pers }

        dispatch(FileUploadAction.addFilesUploadProcess(fileProcess))
      },
    })
      .then((res) => {
        let r = []
        const { data } = res.data

        r.push(data)
        r[0].idProcess = elm?.id

        dispatch(FileUploadAction.showFileUploadDone(r))
      })
      .catch((err) => {
        // if (err) {
        //   handleError('FileUploadAction', err)
        // }

        if (!isCalled) {
          isCalled = true
          statusOfListFile[elm.id] = 2
          requestAnimationFrame(() => {
            axiosUploadFile()
          })
        }
      })
  }

  const handleCancelUploadFiles = () => {
    listFileTotal = []
    statusOfListFile = {}
    // cancel = {}
    cancelUpload(-1)
    setShowModalCancelUpload(false)
    setListFiles([])
    dispatch(FileUploadAction.activePopup(false))
    // listFileTotal = []
    // dispatch(FileUploadAction.addFilesUpload([]))
  }

  const location1 = useLocation()

  useEffect(() => {
    if (listFileTotal.length === listFileUploadDone.length) {
      handleCancelUploadFiles()
    }
  }, [location1])

  const handleOnClose = () => {
    return listFileTotal.length === listFileUploadDone.length
      ? handleCancelUploadFiles()
      : setShowModalCancelUpload(true)
  }

  return (
    <>
      <ProcessBarPopup
        isMobile={isMobile}
        pos={isMobile ? '310px' : '360px'}
        isDone={listFileTotal.length === listFileUploadDone.length}
        clickWhenDone={transform}
        onClick={() => {
          if (listFileTotal.length === listFileUploadDone.length) {
            setTransform(!transform)
          }
        }}
      >
        <PopupProcessingg>
          <TitlePopup>
            <TextTitle>
              {listFileTotal.length === listFileUploadDone.length ? 'File Uploaded' : 'File Upload Processing'}
            </TextTitle>
            <ClosePopup onClick={handleOnClose}>X</ClosePopup>
          </TitlePopup>
          <ContentPopup>
            {listFileTotal.length > 0 &&
              listFiles.map((id, i) => {
                const elm = listFileTotal[i]

                return (
                  <FileItem key={elm.id}>
                    <ImageFileItem>
                      {elm?.file?.type.substr(0, 5) === 'image' ? (
                        <Image alt={elm?.fileName} src={URL.createObjectURL(elm?.file)} RenderImg={ImgPopup}></Image>
                      ) : (
                        <WrapVideo>
                          <source src={URL.createObjectURL(elm?.file)}></source>
                        </WrapVideo>
                      )}
                    </ImageFileItem>
                    <NameFileItem>
                      {' '}
                      <p>{elm?.fileName}</p>
                    </NameFileItem>

                    <ProcessingIcon>
                      {filesProcessing?.map((item) => {
                        if (item.id === elm.id && item.per < 100) {
                          return <CircularProgress size={30} strokeWidth={3} percentage={item.per} color="green" />
                        }
                      })}

                      {filesProcessing?.map((item) => {
                        const idx = listFileUploadDone.findIndex((v) => v.idProcess === item.id)
                        if (item.id === elm.id && item.per === 100) {
                          if (idx > -1) {
                            return <FontAwesomeIcon width="100%" height="100%" color="green" icon={faCircleCheck} />
                          } else {
                            return <ClipLoader color={'green'} loading={true} cssOverride={override} size={30} />
                          }
                        }
                      })}
                    </ProcessingIcon>
                    <WrapCancel>
                      {statusOfListFile[elm.id] !== 1 && <p onClick={cancelUpload.bind(this, elm.id)}>X</p>}
                    </WrapCancel>
                  </FileItem>
                )
              })}
          </ContentPopup>
        </PopupProcessingg>
      </ProcessBarPopup>
      <CustomModalConfirm
        title={'Do you want cancel this process ?'}
        onClose={() => setShowModalCancelUpload(false)}
        onYes={handleCancelUploadFiles}
        isShow={showModalCancelUpload}
      />
    </>
  )
}

export default PopupProcessing

const ProcessBarPopup = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: ${(props) => (props.isMobile ? '300px' : '370px')};
  height: ${(props) => (props.isMobile ? '350px' : '400px')};
  background: #fff;
  z-index: 999;
  border-radius: 0 4px 0 0;
  overflow: hidden;
  border-right: 1px solid #ff6600;
  transition: ${(props) => (props.clickWhenDone ? 'all 0.35s ease-in' : 'all 0.6s ease-out')};
  transform: ${(props) =>
    props.clickWhenDone ? 'translateY(0px)' : props.isDone ? `translateY(310px)` : 'translateY(0px)'};

  /* opacity: ${(props) => (props.show ? 1 : 0)}; */
`

const PopupProcessingg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const TitlePopup = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ff6600;
  padding: 0 10px;
`
const TextTitle = styled.div`
  font-size: 16px;
  color: #ccc;
`
const ClosePopup = styled.div`
  width: 40px;
  height: 40px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  cursor: pointer;
`
const ContentPopup = styled.div`
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const FileItem = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
  height: 50px;
  min-height: 50px;
  border-bottom: 1px solid #ccc;
`

const ImageFileItem = styled.div`
  width: 50px;
  height: 100%;
  background: #ccc;
  border-radius: 5px;
  /* border: 1px solid red; */
`

const ImgPopup = styled.img`
  width: 100%;
  height: 100%;
  /* max-width: 100%; */
  object-fit: contain;
`

const NameFileItem = styled.div`
  flex: 1;
  width: 200px;
  min-width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;

  p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const WrapCancel = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-left: 7px;
  }
`

const ProcessingIcon = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WrapVideo = styled.video`
  width: 100%;
  max-height: 100%;
  height: auto;
  object-fit: contain;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`
