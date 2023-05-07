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
        { id: 1, pieza: "18c", img: url + "18C.png" },
        { id: 2, pieza: "17c", img: url + "17C.png" },
        { id: 3, pieza: "16c", img: url + "16C.png" },
        { id: 4, pieza: "15c", img: url + "15C.png" },
        { id: 5, pieza: "14c", img: url + "14C.png" },
        { id: 6, pieza: "13c", img: url + "13C.png" },
        { id: 7, pieza: "12c", img: url + "12C.png" },
        { id: 8, pieza: "11c", img: url + "11C.png" },
        { id: 9, pieza: "21c", img: url + "21C.png" },
        { id: 10, pieza: "22c", img: url + "22C.png" },
        { id: 11, pieza: "23c", img: url + "23C.png" },
        { id: 12, pieza: "24c", img: url + "24C.png" },
        { id: 13, pieza: "25c", img: url + "25C.png" },
        { id: 14, pieza: "26c", img: url + "26C.png" },
        { id: 15, pieza: "27c", img: url + "27C.png" },
        { id: 16, pieza: "28c", img: url + "28C.png" },
      ],
    },
    {
      tooth: [
        { id: 17, pieza: "18b", img: url + "18B.png" },
        { id: 18, pieza: "17b", img: url + "17B.png" },
        { id: 19, pieza: "16b", img: url + "16B.png" },
        { id: 20, pieza: "15b", img: url + "15B.png" },
        { id: 21, pieza: "14b", img: url + "14B.png" },
        { id: 22, pieza: "", img: "" },
        { id: 23, pieza: "", img: "" },
        { id: 24, pieza: "", img: "" },
        { id: 25, pieza: "", img: "" },
        { id: 26, pieza: "", img: "" },
        { id: 27, pieza: "", img: "" },
        { id: 28, pieza: "24b", img: url + "24B.png" },
        { id: 29, pieza: "25b", img: url + "25B.png" },
        { id: 30, pieza: "26b", img: url + "26B.png" },
        { id: 31, pieza: "27b", img: url + "27B.png" },
        { id: 32, pieza: "28b", img: url + "28B.png" },
      ],
    },
    {
      tooth: [
        { id: 33, pieza: "18a", img: url + "18A.png" },
        { id: 34, pieza: "17a", img: url + "17A.png" },
        { id: 35, pieza: "16a", img: url + "16A.png" },
        { id: 36, pieza: "15a", img: url + "15A.png" },
        { id: 37, pieza: "14a", img: url + "14A.png" },
        { id: 38, pieza: "13a", img: url + "13A.png" },
        { id: 39, pieza: "12a", img: url + "12A.png" },
        { id: 40, pieza: "11a", img: url + "11A.png" },
        { id: 41, pieza: "21a", img: url + "21A.png" },
        { id: 42, pieza: "22a", img: url + "22A.png" },
        { id: 43, pieza: "23a", img: url + "23A.png" },
        { id: 44, pieza: "24a", img: url + "24A.png" },
        { id: 45, pieza: "25a", img: url + "25A.png" },
        { id: 46, pieza: "26a", img: url + "26A.png" },
        { id: 47, pieza: "27a", img: url + "27A.png" },
        { id: 48, pieza: "28a", img: url + "28A.png" },
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
        { id: 49, pieza: "48a", img: url + "48A.png" },
        { id: 50, pieza: "47a", img: url + "47A.png" },
        { id: 51, pieza: "46a", img: url + "46A.png" },
        { id: 52, pieza: "45a", img: url + "45A.png" },
        { id: 53, pieza: "44a", img: url + "44A.png" },
        { id: 54, pieza: "43a", img: url + "43A.png" },
        { id: 55, pieza: "42a", img: url + "42A.png" },
        { id: 56, pieza: "41a", img: url + "41A.png" },
        { id: 57, pieza: "31a", img: url + "31A.png" },
        { id: 58, pieza: "32a", img: url + "32A.png" },
        { id: 59, pieza: "33a", img: url + "33A.png" },
        { id: 60, pieza: "34a", img: url + "34A.png" },
        { id: 61, pieza: "35a", img: url + "35A.png" },
        { id: 62, pieza: "36a", img: url + "36A.png" },
        { id: 63, pieza: "37a", img: url + "37A.png" },
        { id: 64, pieza: "38a", img: url + "38A.png" },
      ],
    },
    {
      tooth: [
        { id: 65, pieza: "48b", img: url + "48B.png" },
        { id: 66, pieza: "47b", img: url + "47B.png" },
        { id: 67, pieza: "46b", img: url + "46B.png" },
        { id: 68, pieza: "45b", img: url + "45B.png" },
        { id: 69, pieza: "44b", img: url + "44B.png" },
        { id: 70, pieza: "", img: "" },
        { id: 71, pieza: "", img: "" },
        { id: 72, pieza: "", img: "" },
        { id: 73, pieza: "", img: "" },
        { id: 74, pieza: "", img: "" },
        { id: 75, pieza: "", img: "" },
        { id: 76, pieza: "34b", img: url + "34B.png" },
        { id: 77, pieza: "35b", img: url + "35B.png" },
        { id: 78, pieza: "36b", img: url + "36B.png" },
        { id: 79, pieza: "37b", img: url + "37B.png" },
        { id: 80, pieza: "38b", img: url + "38B.png" },
      ],
    },
    {
      tooth: [
        { id: 81, pieza: "48c", img: url + "48C.png" },
        { id: 82, pieza: "47c", img: url + "47C.png" },
        { id: 83, pieza: "46c", img: url + "46C.png" },
        { id: 84, pieza: "45c", img: url + "45C.png" },
        { id: 85, pieza: "44c", img: url + "44C.png" },
        { id: 86, pieza: "43c", img: url + "43C.png" },
        { id: 87, pieza: "42c", img: url + "42C.png" },
        { id: 88, pieza: "41c", img: url + "41C.png" },
        { id: 89, pieza: "31c", img: url + "31C.png" },
        { id: 90, pieza: "32c", img: url + "32C.png" },
        { id: 91, pieza: "33c", img: url + "33C.png" },
        { id: 92, pieza: "34c", img: url + "34C.png" },
        { id: 93, pieza: "35c", img: url + "35C.png" },
        { id: 94, pieza: "36c", img: url + "36C.png" },
        { id: 95, pieza: "37c", img: url + "37C.png" },
        { id: 96, pieza: "38c", img: url + "38C.png" },
      ],
    },
  ];

  return (
    <>
      <Table>
        <Tbody>
          {arrayTeethUp.map((t) => {
            return (
              <tr>
                {t.tooth.map((a) => {
                  return (
                    <TdTable>
                      <img src={a.img} />{" "}
                    </TdTable>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {indiceUp.map((i) => {
              return <TdTable>{i}</TdTable>;
            })}
          </tr>

          <tr>
            {indiceDown.map((i) => {
              return <TdTable>{i}</TdTable>;
            })}
          </tr>

          {arrayTeethDown.map((t) => {
            return (
              <tr>
                {t.tooth.map((a) => {
                  return (
                    <TdTable>
                      <img src={a.img} />{" "}
                    </TdTable>
                  );
                })}
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default TeethTable;
