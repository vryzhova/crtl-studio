type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  task?: string;
  taskTitle?: string;
  description: string[];
  tags: string[];
};

export const getCases = (t: (key: string) => string, lang: string = 'ru') => {
  const cases: Case[] = [
    {
      id: 'right-side',
      title: 'Right Side',
      year: '2025',
      cover: '/cases/RS_cover.png',
      images: [`/cases/RS_${lang}.png`, '/cases/RS2.png', '/cases/RS3.png', '/cases/RS_4.png', '/cases/RS5.png'],
      task: t('cases.case_1_task'),
      description: [
        t('cases.case_1_description_1'),
        t('cases.case_1_description_2'),
        t('cases.case_1_description_3'),
        t('cases.case_1_description_4'),
      ],
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'seven-senses',
      title: 'SEVEN SENSES',
      year: '2025',
      cover: '/cases/7S_cover.png',
      images: [`/cases/S7_${lang}.png`, '/cases/S7_2.png', '/cases/S7_3.png', '/cases/S7_4.png', '/cases/S7_5.png'],
      task: t('cases.case_2_task'),
      description: [t('cases.case_2_description_1'), t('cases.case_2_description_2'), t('cases.case_2_description_3')],
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'pay-killa',
      title: 'PayKilla',
      year: '2025',
      cover: '/cases/PAYK_cover.png',
      images: [`/cases/PK_${lang}.png`, '/cases/PK_2.png', '/cases/PK_3.png', '/cases/PK_4.png', '/cases/PK_5.png'],
      task: t('cases.case_3_task'),
      taskTitle: t('cases.case_3_task'),
      description: [t('cases.case_3_description_1'), t('cases.case_3_description_2'), t('cases.case_3_description_3')],
      tags: [t('cases.case_3_tag_1'), t('cases.case_3_tag_2'), t('cases.case_3_tag_3')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/AIM_cover.png',
      images: [`/cases/AIM_${lang}.png`, '/cases/AIM_2.png', '/cases/AIM_3.png', '/cases/AIM_4.png'],
      task: t('cases.case_4_task'),
      taskTitle: t('cases.case_4_task_title'),
      description: [t('cases.case_4_description_1'), t('cases.case_4_description_2')],
      tags: [t('cases.case_4_tag_1')],
    },
    {
      id: 'pythia',
      title: 'PYTHIA',
      year: '2025',
      cover: '/cases/PYTHIA_cover.png',
      images: [`/cases/PYTHIA_${lang}.png`, '/cases/PYTHIA_5.png', '/cases/PYTHIA_3.png', '/cases/PYTHIA_4.png'],
      taskTitle: t('cases.case_5_task_title'),
      description: [t('cases.case_5_description_1')],
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: '3d',
      title: t('cases.case_6_name'),
      year: '2025',
      cover: '/cases/3D_game_cover.png',
      images: [`/cases/3D_игра_${lang}.png`, '/cases/3D_игра_2.png', '/cases/3D_игра_3.png', '/cases/3D_игра_4.png'],
      task: t('cases.case_6_task'),
      taskTitle: t('cases.case_6_task_title'),
      description: [t('cases.case_6_description_1'), t('cases.case_6_description_2'), t('cases.case_6_description_3')],
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'mini-app',
      title: t('cases.case_7_name'),
      year: '2025',
      cover: '/cases/club_cover.png',
      images: [
        `/cases/Инвестиционный_клуб_${lang}.png`,
        '/cases/Инвестиционный_клуб.png',
        '/cases/Инвестиционный_клуб_1.png',
        '/cases/Инвестиционный_клуб_2.png',
        '/cases/Инвестиционный_клуб_3.png',
      ],
      task: t('cases.case_7_task'),
      taskTitle: t('cases.case_7_task_title'),
      description: [t('cases.case_7_description_1'), t('cases.case_7_description_2'), t('cases.case_7_description_3')],
      tags: [t('cases.case_5_tag_1')],
    },
  ];

  return cases;
};
