'use client'

import { motion } from 'motion/react'
import React from 'react'
import { IconType } from 'react-icons'
import { FaReact, FaGitAlt, FaNodeJs, FaPython } from "react-icons/fa";
import { TbBrandNextjs, TbBrandTailwind, TbBrandVscode, TbBrandFigma, TbBrandAndroid } from "react-icons/tb";
import { SiFlutter, SiSharp, SiBootstrap } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";

/**
 * Sección de Habilidades
 * Muestra las tecnologías y herramientas que maneja
 */
export default function Skills() {
  const skillIcons: { [key: string]: IconType } = {
    'React': FaReact,
    'Next.js': TbBrandNextjs,
    'Tailwind CSS': TbBrandTailwind,
    'Bootstrap': SiBootstrap,
    'Flutter': SiFlutter,
    'Java (Android)': TbBrandAndroid,
    'React Native': FaReact,
    'Python': FaPython,
    'C#': SiSharp,
    'Node.js': FaNodeJs,
    'REST APIs': BiCodeAlt,
    'Git': FaGitAlt,
    'Figma': TbBrandFigma,
    'VS Code': TbBrandVscode,
    'Android Studio': TbBrandAndroid,
  }

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Mobile',
      skills: ['Flutter', 'Java (Android)', 'React Native'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Backend',
      skills: ['Python', 'C#', 'Node.js', 'REST APIs'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Herramientas',
      skills: ['Git', 'Figma', 'VS Code', 'Android Studio'],
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Habilidades <span className="text-primary">Técnicas</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.08, ease: "easeOut" }}
              className="bg-darker p-6 rounded-lg border border-slate-700 hover:border-primary glow-on-hover"
            >
              <div className={`w-12 h-1 bg-gradient-to-r ${category.color} mb-4`}></div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.08 + skillIndex * 0.03, ease: "easeOut" }}
                    className="text-slate-300 flex items-center"
                  >
                    {skillIcons[skill] ? (
                      <span className="mr-2 text-xl text-primary">
                        {React.createElement(skillIcons[skill])}
                      </span>
                    ) : (
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    )}
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}