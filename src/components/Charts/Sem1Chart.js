import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import './SemCharts.css';

export default function Sem1Chart() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rollnumber = params.get('roll');
  const [users, setUsers] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [studentInfo, setStudentInfo] = useState({}); // State for student info

  const labelss = ['Cprogramming', 'EngineeringDrawing', 'English', 'M1', 'Physics'];
  const url = `http://localhost:5000/sem1/${rollnumber}`;

  const fetchHighestMarks = async (subject) => {
    try {
      const response = await fetch(`http://localhost:5000/sem1/max/${subject}`, {
        method: 'POST',
      });

      if (response.ok) {
        const highestMark = await response.json();
        return highestMark[subject];
      } else {
        console.log(`Error fetching highest mark for ${subject}`);
        return null;
      }
    } catch (error) {
      console.log(`Error fetching highest mark for ${subject}:`, error);
      return null;
    }
  };

  const fetchAverageMarks = async (subject) => {
    try {
      const response = await fetch(`http://localhost:5000/sem1/avg/${subject}`, {
        method: 'POST',
      });

      if (response.ok) {
        const averageMark = await response.json();
        return averageMark[subject];
      } else {
        console.log(`Error fetching average mark for ${subject}`);
        return null;
      }
    } catch (error) {
      console.log(`Error fetching average mark for ${subject}:`, error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const userDataResponse = await fetch(url, {
        method: 'GET',
      });

      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        setUsers(userData);

        const highestMarksPromises = labelss.map(async (subject) => {
          const highestMark = await fetchHighestMarks(subject);
          return highestMark;
        });

        const averageMarksPromises = labelss.map(async (subject) => {
          const averageMark = await fetchAverageMarks(subject);
          return averageMark;
        });

        const highestMarks = await Promise.all(highestMarksPromises);
        const averageMarks = await Promise.all(averageMarksPromises);

        setData2(highestMarks.filter(mark => mark !== null));
        setData3(averageMarks.filter(mark => mark !== null));

        console.log(userData);
        console.log(highestMarks);
        console.log(averageMarks);
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  // Fetch student information based on the roll number
  const fetchStudentInfo = async () => {
    try {
      const studentResponse = await fetch(`http://localhost:5000/students/${rollnumber}`, {
        method: 'GET',
      });

      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        setStudentInfo(studentData);
      } else {
        console.log('Error fetching student info');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStudentInfo();
  }, []);

  const dataa = labelss.map(function getMarks(item) {
    return users[item];
  });

  const chartData = {
    labels: labelss,
    datasets: [
      {
        label: 'Your-Score',
        data: dataa,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
        xAxisID: 'Subjects',
        yAxisID: 'Marks'
      },
      {
        label: 'Highest-Score',
        data: data2,
        backgroundColor: [
          'rgba(255, 205, 86, 1)',
        ],
        borderColor: [
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1,
        xAxisID: 'Subjects',
        yAxisID: 'Marks'
      },
      {
        label: 'Average-Score',
        data: data3,
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
        xAxisID: 'Subjects',
        yAxisID: 'Marks'
      },
    ]
  };

  return (
    <div className="chartBody">
     
      {dataAvailable ? (
        <div>
          <div className="studentInfo">
            <p>{studentInfo.rollnumber}</p>
            {/* <p>Name: {studentInfo.name}</p>
            <p>Branch: {studentInfo.branch}</p> */}
          </div>
          <p className='chartTitle'> Your Performance </p>
          <Bar className="Bar" data={chartData} />
        </div>
      ) : (
        <div className="noData">
          <h1>NO DATA AVAILABLE</h1>
        </div>
      )}
    </div>
  );
}
