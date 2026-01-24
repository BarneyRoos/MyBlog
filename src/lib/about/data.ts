export const profile = {
  name: "缪培康",
  title: "前端开发工程师",
  location: "甘肃兰州",
  experience: "6年前端开发经验",
  education: "福州大学 · 电子信息工程 · 2016年毕业",
  email: "paykan.miao@gmail.com",
  phone: "19993171541",
  blog: "https://haichuan.netlify.app/",
};

export const skills = {
  languages: ["HTML", "CSS", "JavaScript", "TypeScript"],
  frameworks: ["React", "Next.js", "Vue2"],
  uiLibs: ["Tailwind CSS", "Ant Design", "Material UI"],
  stateManagement: ["Zustand", "Mobx"],
  other: ["Git", "组件化", "模块化", "实时重构", "NestJS"],
};

export const projects = [
  {
    name: "Windows 11 Web - 全栈操作系统模拟平台",
    date: "2025.07 - 2025.08",
    description:
      "基于Next.js和NestJS的网页版Windows 11模拟器，还原了Windows 11的界面和交互体验，采用前后端分离架构和Docker容器化部署。",
    techStack: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "Tailwind CSS",
      "NestJS",
      "MySql",
    ],
    highlights: [
      "实现桌面操作系统的核心功能：窗口管理、桌面图标系统、自定义应用程序",
      "虚拟滚动技术处理大量条目渲染优化性能",
      "自创方案：后端目录保存文档，自动生成文件索引和目录树",
    ],
  },
  {
    name: "医学指南制修订平台",
    date: "2025.3 - 2025.7",
    description:
      "多人协作医学指南指定系统，使用React、Ant Design开发。负责需求沟通、开发设计、任务分配。",
    techStack: ["React", "Ant Design", "TypeScript"],
    highlights: [
      "设计通用组件确保所有步骤的开发和使用体验一致",
      "通过UUID附加到邀请链接，安全可靠地识别专家身份",
      "通过URL查询参数管理步骤状态，保证用户体验一致性",
    ],
  },
  {
    name: "中成药问答平台",
    date: "2025.1 - 2025.2",
    description:
      "AI驱动的中医药问答网站，基于兰大医学指南。使用Vite构建，支持TypeScript、Less、响应式设计和国际化。",
    techStack: ["React", "Vite", "Ant Design", "Mobx", "TypeScript"],
    highlights: [
      "使用Fetch API的ReadableStream实现流式文本渲染",
      "通过TextDecoder解码数据流，在Mobx Store中实时更新",
      "封装useAskAi Hook处理问题发送、流式答案接收、错误处理",
    ],
  },
  {
    name: "视频会议项目",
    date: "2024.9 - 2025.7",
    description:
      "类似于腾讯会议Web版的视频会议网站。处理音视频流、文字消息、会议人员举手等复杂状态管理。",
    techStack: ["React", "TypeScript", "Material UI", "声网API"],
    highlights: [
      "通过专门的类封装声网API，为React组件提供简洁接口",
      "实现声音可视化组件：根据音量跳动的波形效果",
      "完整的音视频流和复杂状态管理",
    ],
  },
];

export const workExperience = [
  {
    company: "自由职业",
    period: "2024.3 - 至今",
    role: "前端开发工程师",
    description:
      "主导多个平台型系统的设计与实现，包括医学指南平台、中成药问答、视频会议等项目。",
  },
  {
    company: "杭州海牛智能科技有限公司",
    period: "2021.4 - 2022.8",
    role: "前端开发工程师",
    description:
      "参与海牛低代码平台流程建模系统开发，使用AntV XFlow实现可视化节点流程图编辑器、配置化表单系统设计。",
  },
  {
    company: "杭州悦孚斯科技有限公司",
    period: "2020.8 - 2021.3",
    role: "前端开发工程师",
    description:
      "参与电商后台项目的页面设计和前端开发，涉及权限管理、多语言、多角色管理等模块。",
  },
  {
    company: "兰州数云科技有限公司",
    period: "2017.1 - 2020.4",
    role: "前端开发工程师",
    description:
      "前期以jQuery为主，后转向React技术栈，参与多个业务系统页面与组件开发。",
  },
];
