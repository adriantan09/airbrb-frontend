import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from '@mui/material';

import { handleChange } from '../../helpers';

const Photos = ({ savedPhotos, setForm }) => {
  const desktopScreen = useMediaQuery('(min-width: 600px)');

  const [photos, setPhotos] = useState(savedPhotos);

  useEffect(() => {
    const thumbnail = { target: { name: 'thumbnail', value: photos[0] } };
    handleChange(thumbnail, 'default', setForm);
    const event = { target: { name: 'photos', value: photos } };
    handleChange(event, 'metadata', setForm);
  }, [photos]);

  const handleFiles = async (event) => {
    const files = event.target.files;
    const uploaded = [];
    for (let file = 0; file < files.length; file++) {
      uploaded.push({
        base64: await convertBase64(files[file]),
        filename: files[file].name,
      });
    }
    setPhotos(photos.concat(uploaded));
  };

  const handleDelete = (index) => {
    photos.splice(index, 1);
    setPhotos([...photos]);
  };

  return (
    <Container>
      <TopSection>
        <div>
          <h3>Add at least 5 photos</h3>
          <Notice>Note: The first uploaded image will be the thumbail</Notice>
          <p>Photos {photos.length} / 5</p>
        </div>
        <UploadButton variant='contained' component='label'>
          Upload File
          <input
            accept='image/*'
            type='file'
            hidden
            multiple
            onChange={(e) => handleFiles(e)}
          />
        </UploadButton>
      </TopSection>

      <StyledTable component={Paper}>
        <Table stickyHeader aria-label='photo table'>
          <TableHead>
            <TableRow>
              <TableCell>Preview</TableCell>
              { desktopScreen && <TableCell>Filename</TableCell>}
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <StyledTableBody>
            {savedPhotos.map((photo, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Photo src={photo.base64} alt='Listing Photo' />
                </TableCell>
                { desktopScreen && <FileCell align='left'>{photo.filename}</FileCell> }
                <TableCell align='right'>
                  <IconButton onClick={() => handleDelete(idx)}>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </StyledTableBody>
        </Table>
      </StyledTable>
    </Container>
  );
};

export default Photos;

Photos.propTypes = {
  savedPhotos: PropTypes.array,
  setForm: PropTypes.func,
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  height: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Notice = styled.p`
  font-size: 10pt;
  margin: 5px 0;
`;

const UploadButton = styled(Button)`
  && {
    height: 40px;
    min-width: 130px;
  }
`;

const Photo = styled.img`
  max-width: 180px;
  max-height: 120px;
`;

const StyledTable = styled(TableContainer)`
  height: 90%;
`;

const StyledTableBody = styled(TableBody)`
  && {
    tr:first-child {
      background-color: #ebebeb;
    }
  }
`;

const FileCell = styled(TableCell)`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
