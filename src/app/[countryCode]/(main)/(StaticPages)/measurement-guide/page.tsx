"use client"
import React, { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import men from "@lib/img/measurement-guide/men.webp"
import women from "@lib/img/measurement-guide/women.webp"
import baby from "@lib/img/measurement-guide/baby.webp"

import { FaArrowDown } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"

const MeasurementGuide = () => {
  const [gender, setGender] = useState("men")
  return (
    <div className="small-container">
      <div className="py-[35px]">
        <div className="text-[20px] font-light flex-1 ">
          A simple guide to make no mistakes
        </div>
        <h1 className="text-[42px] font-normal leading-snug">
          Take your measurements
        </h1>
        <p className="christmas-font mt-6 ">
          The Christmas Fabric clothing is made to an international average
          because we want it to be wearable by everyone. That&apos; why knowing
          your measurements will help you choose the right size. For example, if
          you are used to taking L, for some models it may be a size M that fits
          you better.
        </p>
        <p className="christmas-font mt-6 ">
          Once you have taken your measurements you can then compare them to the
          size guide available on the product page of your choice directly. Our
          products usually have similar or different size guides.
        </p>
      </div>
      <div className="py-[35px]">
        <div className="text-[20px] font-light flex-1 ">Use a string</div>
        <h1 className="text-[42px] font-normal leading-snug">
          Measuring without a tape measure
        </h1>
        <p className="christmas-font mt-6 ">
          No problem! If you don&apos;t have a tape measure, you can use a
          string or the edge of a long towel to measure your bust, waist, hips,
          etc... Then remember to transfer the length of the string or towel to
          a ruler to match the length in cm or inch.
        </p>
      </div>
      <div className="py-[35px]">
        <div className="flex items-center justify-start gap-4">
          <h1 className="text-[42px] font-normal leading-snug">
            View the guide for
          </h1>
          <div className="flex items-center justify-start gap-2 border-b-2 border-black">
            <select
              className="text-[42px] font-normal leading-snug"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="men" className="px-3">
                Men
              </option>
              <option value="women" className="px-3">
                Women
              </option>
              <option value="child" className="px-3">
                Child
              </option>
              <option value="baby" className="px-3">
                Baby
              </option>
            </select>
            <IoIosArrowDown className="text-[28px] font-normal leading-snug" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <ul className="pl-10">
            <li className="christmas-font mt-6">
              <span className="font-bold">A — Buste, tour de buste :</span>{" "}
              Mesurer le tour du buste. Tous les guides des tailles Noël Shop
              indiquent la mesure du tour de buste. Très utilisé sur nos guides
              des tailles.
              <br />
              <span className="font-bold">Longueur du haut :</span> Mesurer la
              longueur du creux en bas du cou jusqu&apos;au bassin. Très utilisé
              sur nos guides des tailles.
            </li>
            <li className="christmas-font mt-6">
              <span className="font-bold">B — Taille, tour de taille :</span>{" "}
              Mesurer le tour de la taille. Souvent utilisé sur nos guides des
              tailles.
              <br />
              <span className="font-bold">Longueur du bas : </span> Mesurer la
              longueur du bassin jusqu&apos;à la cheville. Très utilisé sur nos
              guides des tailles.
            </li>
            <li className="christmas-font mt-6">
              <span className="font-bold">C — Hanches, tour de hanches :</span>{" "}
              Mesurer le tour de hanches. Parfois utilisé sur nos guides des
              tailles.
            </li>
            <li className="christmas-font mt-6">
              <span className="font-bold">
                D — Longueur d&apos;entrejambe :
              </span>{" "}
              Mesurer la longueur du creux de l&apos;entrejambe à la cheville
              sans plier la jambe. Peu utilisé sur nos guides des tailles.
            </li>
          </ul>
          {gender === "men" && <Image src={men} alt="test" />}
          {gender === "women" && <Image src={women} alt="test" />}
          {gender === "child" && <Image src={men} alt="test" />}
          {gender === "baby" && <Image src={baby} alt="test" />}
        </div>
      </div>
    </div>
  )
}

export default MeasurementGuide
