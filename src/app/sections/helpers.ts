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
      cover: '/cases/RS_cover.webp',
      images: [`/cases/RS_${lang}.webp`, '/cases/RS2.webp', '/cases/RS3.webp', '/cases/RS_4.webp', '/cases/RS5.webp'],
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
      cover: '/cases/7S_cover.webp',
      images: [
        `/cases/S7_${lang}.webp`,
        '/cases/S7_2.webp',
        '/cases/S7_3.webp',
        '/cases/S7_4.webp',
        '/cases/S7_5.webp',
      ],
      task: t('cases.case_2_task'),
      description: [t('cases.case_2_description_1'), t('cases.case_2_description_2'), t('cases.case_2_description_3')],
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'pay-killa',
      title: 'PayKilla',
      year: '2025',
      cover: '/cases/PAYK_cover.webp',
      images: [
        `/cases/PK_${lang}.webp`,
        '/cases/PK_2.webp',
        '/cases/PK_3.webp',
        '/cases/PK_4.webp',
        '/cases/PK_5.webp',
      ],
      task: t('cases.case_3_task'),
      taskTitle: t('cases.case_3_task'),
      description: [t('cases.case_3_description_1'), t('cases.case_3_description_2'), t('cases.case_3_description_3')],
      tags: [t('cases.case_3_tag_1'), t('cases.case_3_tag_2'), t('cases.case_3_tag_3')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/AIM_cover.webp',
      images: [`/cases/AIM_${lang}.webp`, '/cases/AIM_2.webp', '/cases/AIM_3.webp', '/cases/AIM_4.webp'],
      task: t('cases.case_4_task'),
      taskTitle: t('cases.case_4_task_title'),
      description: [t('cases.case_4_description_1'), t('cases.case_4_description_2')],
      tags: [t('cases.case_4_tag_1')],
    },
    {
      id: 'pythia',
      title: 'PYTHIA',
      year: '2025',
      cover: '/cases/PYTHIA_cover.webp',
      images: [`/cases/PYTHIA_${lang}.webp`, '/cases/PYTHIA_5.webp', '/cases/PYTHIA_3.webp', '/cases/PYTHIA_4.webp'],
      taskTitle: t('cases.case_5_task_title'),
      description: [t('cases.case_5_description_1')],
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: '3d',
      title: t('cases.case_6_name'),
      year: '2025',
      cover: '/cases/3D_game_cover.webp',
      images: [
        `/cases/3D_игра_${lang}.webp`,
        '/cases/3D_игра_2.webp',
        '/cases/3D_игра_3.webp',
        '/cases/3D_игра_4.webp',
      ],
      task: t('cases.case_6_task'),
      taskTitle: t('cases.case_6_task_title'),
      description: [t('cases.case_6_description_1'), t('cases.case_6_description_2'), t('cases.case_6_description_3')],
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'mini-app',
      title: t('cases.case_7_name'),
      year: '2025',
      cover: '/cases/club_cover.webp',
      images: [
        `/cases/Инвестиционный_клуб_${lang}.webp`,
        `/cases/Инвестиционный_клуб_${lang}.webp`,
        '/cases/Инвестиционный_клуб.webp',
        '/cases/Инвестиционный_клуб_1.webp',
        '/cases/Инвестиционный_клуб_2.webp',
        '/cases/Инвестиционный_клуб_3.webp',
      ],
      task: t('cases.case_7_task'),
      taskTitle: t('cases.case_7_task_title'),
      description: [t('cases.case_7_description_1'), t('cases.case_7_description_2'), t('cases.case_7_description_3')],
      tags: [t('cases.case_5_tag_1')],
    },
  ];

  return cases;
};
