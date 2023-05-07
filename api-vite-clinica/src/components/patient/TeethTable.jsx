import React from "react";
import Table from "../Table";
import Thead from "../Thead";
import Tbody from "../Tbody";
import TdTable from "../TdTable";
import BtnsTable from "../BtnsTable";
import { MdDelete } from "react-icons/md";

function TeethTable() {
  const url = "http://localhost/img/tfg-clinic/";

  const arrayTeethUp = [
    {
      tooth: [
        { id: 1, pieza: "18c", img: url + "18C" },
        { id: 2, pieza: "17c", img: url + "17C" },
        { id: 3, pieza: "16c", img: url + "16C" },
        { id: 4, pieza: "15c", img: url + "15C" },
        { id: 5, pieza: "14c", img: url + "14C" },
        { id: 6, pieza: "13c", img: url + "13C" },
        { id: 7, pieza: "12c", img: url + "12C" },
        { id: 8, pieza: "11c", img: url + "11C" },
        { id: 9, pieza: "21c", img: url + "21C" },
        { id: 10, pieza: "22c", img: url + "22C" },
        { id: 11, pieza: "23c", img: url + "23C" },
        { id: 12, pieza: "24c", img: url + "24C" },
        { id: 13, pieza: "25c", img: url + "25C" },
        { id: 14, pieza: "26c", img: url + "26C" },
        { id: 15, pieza: "27c", img: url + "27C" },
        { id: 16, pieza: "28c", img: url + "28C" },
      ],
    },
    {
      tooth: [
        { id: 17, pieza: "18b", img: url + "18B" },
        { id: 18, pieza: "17b", img: url + "17B" },
        { id: 19, pieza: "16b", img: url + "16B" },
        { id: 20, pieza: "15b", img: url + "15B" },
        { id: 21, pieza: "14b", img: url + "14B" },
        { id: 22, pieza: "", img: "" },
        { id: 23, pieza: "", img: "" },
        { id: 24, pieza: "", img: "" },
        { id: 25, pieza: "", img: "" },
        { id: 26, pieza: "", img: "" },
        { id: 27, pieza: "", img: "" },
        { id: 28, pieza: "24b", img: url + "24B" },
        { id: 29, pieza: "25b", img: url + "25B" },
        { id: 30, pieza: "26b", img: url + "26B" },
        { id: 31, pieza: "27b", img: url + "27B" },
        { id: 32, pieza: "28b", img: url + "28B" },
      ],
    },
    {
      tooth: [
        { id: 33, pieza: "18a", img: url + "18A" },
        { id: 34, pieza: "17a", img: url + "17A" },
        { id: 35, pieza: "16a", img: url + "16A" },
        { id: 36, pieza: "15a", img: url + "15A" },
        { id: 37, pieza: "14a", img: url + "14A" },
        { id: 38, pieza: "13a", img: url + "13A" },
        { id: 39, pieza: "12a", img: url + "12A" },
        { id: 40, pieza: "11a", img: url + "11A" },
        { id: 41, pieza: "21a", img: url + "21A" },
        { id: 42, pieza: "22a", img: url + "22A" },
        { id: 43, pieza: "23a", img: url + "23A" },
        { id: 44, pieza: "24a", img: url + "24A" },
        { id: 45, pieza: "25a", img: url + "25A" },
        { id: 46, pieza: "26a", img: url + "26A" },
        { id: 47, pieza: "27a", img: url + "27A" },
        { id: 48, pieza: "28a", img: url + "28A" },
      ],
    },
  ];

  const indiceUp = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  ];
  const indiceDown = [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  const arrayTeethDown = [
    {
      tooth: [
        { id: 49, pieza: "48a", img: url+"48A" },
        { id: 50, pieza: "47a", img: url+"48A" },
        { id: 51, pieza: "46a", img: url+"48A" },
        { id: 52, pieza: "45a", img: url+"48A" },
        { id: 53, pieza: "44a", img: url+"48A" },
        { id: 54, pieza: "43a", img: url+"48A" },
        { id: 55, pieza: "42a", img: url+"48A" },
        { id: 56, pieza: "41a", img: url+"48A" },
        { id: 57, pieza: "31a", img: url+"48A" },
        { id: 58, pieza: "32a", img: url+"48A" },
        { id: 59, pieza: "33a", img: url+"48A" },
        { id: 60, pieza: "34a", img: url+"48A" },
        { id: 61, pieza: "35a", img: url+"48A" },
        { id: 62, pieza: "36a", img: url+"48A" },
        { id: 63, pieza: "37a", img: url+"48A" },
        { id: 64, pieza: "38a", img: url+"48A" },
      ],
    },
    {
      tooth: [
        { id: 65, pieza: "48b", img: "" },
        { id: 66, pieza: "47b", img: "" },
        { id: 67, pieza: "46b", img: "" },
        { id: 68, pieza: "45b", img: "" },
        { id: 69, pieza: "44b", img: "" },
        { id: 70, pieza: "", img: "" },
        { id: 71, pieza: "", img: "" },
        { id: 72, pieza: "", img: "" },
        { id: 73, pieza: "", img: "" },
        { id: 74, pieza: "", img: "" },
        { id: 75, pieza: "", img: "" },
        { id: 76, pieza: "34b", img: "" },
        { id: 77, pieza: "35b", img: "" },
        { id: 78, pieza: "36b", img: "" },
        { id: 79, pieza: "37b", img: "" },
        { id: 80, pieza: "38b", img: "" },
      ],
    },
    {
      tooth: [
        { id: 81, pieza: "48c", img: "" },
        { id: 82, pieza: "47c", img: "" },
        { id: 83, pieza: "46c", img: "" },
        { id: 84, pieza: "45c", img: "" },
        { id: 85, pieza: "44c", img: "" },
        { id: 86, pieza: "43c", img: "" },
        { id: 87, pieza: "42c", img: "" },
        { id: 88, pieza: "41c", img: "" },
        { id: 89, pieza: "31c", img: "" },
        { id: 90, pieza: "32c", img: "" },
        { id: 91, pieza: "33c", img: "" },
        { id: 92, pieza: "34c", img: "" },
        { id: 93, pieza: "35c", img: "" },
        { id: 94, pieza: "36c", img: "" },
        { id: 95, pieza: "37c", img: "" },
        { id: 96, pieza: "38c", img: "" },
      ],
    },
  ];

  return (
    <>
      <Table>
        <Tbody>
          <tr>
            <TdTable>Empaste</TdTable>

            <TdTable> 18a</TdTable>

            <TdTable>Sergio Hervás Aragón</TdTable>

            <TdTable>50 €</TdTable>

            <TdTable>
              <BtnsTable className={"deleteTable"}>
                <MdDelete />
              </BtnsTable>
            </TdTable>
          </tr>
        </Tbody>
      </Table>
    </>
  );
}

export default TeethTable;
