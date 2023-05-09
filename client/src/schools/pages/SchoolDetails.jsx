import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import SchoolsInfos from '../components/SchoolDetails/SchoolsInfos';

const SchoolDetails = () => {
    const [school, setSchool] = useState();
    const { id } = useParams();

  const getSchool = async () => {
    const response = await fetch(`https://www.edukarta.com/api/v1/schools/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setSchool(data.school);
    console.log(data);
  };
  useEffect(() => {
    getSchool();
  }, [id]);
//   if (!user) return null;

  return (
    <div>
        {school && <SchoolsInfos school={school} getSchool={getSchool} />}
    </div>
  )
}

export default SchoolDetails