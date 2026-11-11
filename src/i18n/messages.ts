export type Locale = 'en' | 'zh'

const en = {
  meta: {
    title: 'PAYLUME INC. | Business Payment Solutions',
    description:
      'PAYLUME INC. — business payment solutions built around clarity, reliability and responsible operations.',
  },
  common: {
    languageLabel: 'Language',
    skipToContent: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    primaryNav: 'Primary navigation',
    mobileNav: 'Mobile navigation',
    getInTouch: 'Get in touch',
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Approach', href: '#approach' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Business Payment Solutions',
    titleLines: [
      { text: 'Clarity for money', accent: false },
      { text: 'in motion.', accent: true },
    ],
    copy: {
      lead: 'PAYLUME INC. is building a practical foundation for business payments, with an emphasis on ',
      emphasis: 'clear processes, reliable operations and responsible growth.',
    },
    primaryCta: { label: 'Explore capabilities', href: '#capabilities' },
    secondaryCta: { label: 'View solutions', href: '#solutions' },
    panel: {
      label: 'Payment workspace',
      caption: 'Transaction workflow',
      title: 'Clear from request to completion.',
      status: 'In progress',
      amountLabel: 'Payment amount',
      amountValue: 'USD 24,500.00',
      amountNote: 'Business payment · Global',
      referenceLabel: 'Reference',
      referenceValue: 'PY-2048',
      routeLabel: 'Route',
      progressLabel: 'Workflow progress',
      progressValue: '2 / 3',
      badge: 'Business review complete',
      route: {
        originCode: 'USD',
        originLabel: 'Origin',
        destinationCode: 'Global',
        destinationLabel: 'Business destination',
      },
      steps: [
        { icon: '✓', name: 'Payment request', status: 'Received', done: true },
        { icon: '✓', name: 'Business review', status: 'Complete', done: true },
        { icon: '→', name: 'Processing', status: 'In progress', done: false },
      ],
      note: 'Illustrative workflow · availability subject to eligibility',
    },
  },
  trust: {
    ariaLabel: 'PAYLUME operating principles',
    items: [
      { title: 'Business focused', copy: 'Built around practical operating needs' },
      { title: 'Process driven', copy: 'Clear steps and documented workflows' },
      { title: 'Risk aware', copy: 'Thoughtful review from the start' },
    ],
  },
  about: {
    kicker: 'About PAYLUME',
    title: 'A practical foundation for business payments.' as string | string[],
    paragraphs: [
      'PAYLUME INC. is a New York corporation focused on supporting the payment needs of modern businesses. We aim to make payment activity more understandable, manageable and operationally consistent.',
      'Our approach brings together business operations, risk awareness and technology. The availability of any service is subject to customer eligibility, transaction context, partner requirements and applicable law.',
    ],
    meta: [
      { key: 'Business first', value: 'Built around practical operating needs' },
      { key: 'Clear processes', value: 'Straightforward from start to finish' },
      { key: 'Risk aware', value: 'Thoughtful at every stage' },
      { key: 'Technology enabled', value: 'Designed for consistent operations' },
    ],
  },
  capabilities: {
    kicker: 'What We Focus On',
    title: 'A clear and responsible approach to business payments.' as string | string[],
    items: [
      {
        title: 'Business Payments',
        tag: 'Eligibility-based',
        copy: "Payment solutions considered in the context of each customer's business needs, eligibility and operating profile.",
      },
      {
        title: 'Operational Clarity',
        tag: 'Documented workflows',
        copy: 'Clear processes and practical support designed to help eligible customers understand their payment activity.',
      },
      {
        title: 'Risk Awareness',
        tag: 'Risk-based review',
        copy: 'A risk-based approach that considers customer information, intended activity and relevant requirements.',
      },
      {
        title: 'Technology Enablement',
        tag: 'Consistent operations',
        copy: 'Technology-led workflows intended to support consistent operations and appropriate transaction visibility.',
      },
    ],
  },
  approach: {
    kicker: 'Our Approach',
    titleLines: ['Clear by design.', 'Responsible by default.'],
    intro:
      'Payment relationships work best when commercial objectives, operational controls and regulatory responsibilities are considered together.',
    steps: [
      {
        label: 'Understand',
        title: 'Know the context',
        copy: 'We begin with the customer, intended use case, transaction flows and geographic scope.',
      },
      {
        label: 'Assess',
        title: 'Review the requirements',
        copy: 'Eligibility, operational feasibility and applicable compliance requirements are evaluated before activation.',
      },
      {
        label: 'Support',
        title: 'Maintain visibility',
        copy: 'Eligible activity is supported through documented processes and risk-aware operations.',
      },
    ],
  },
  solutions: {
    kicker: 'Solutions',
    title: 'Designed around everyday business payment needs.' as string | string[],
    items: [
      {
        label: '01 · Pay',
        title: 'Business Payment Workflows',
        copy: 'Practical payment workflows designed to help eligible businesses manage routine transaction activity with greater clarity.',
        list: ['Structured payment requests', 'Review and approval steps', 'Transaction status visibility'],
      },
      {
        label: '02 · Coordinate',
        title: 'Cross-Border Operations',
        copy: 'Operational support for eligible international business payment needs, considered in line with applicable requirements.',
        list: ['International payment coordination', 'Business-purpose review', 'Operational support'],
      },
      {
        label: '03 · Understand',
        title: 'Reporting & Reconciliation',
        copy: 'Structured transaction information intended to support internal visibility, payment review and reconciliation processes.',
        list: ['Transaction records', 'Status and activity review', 'Reconciliation support'],
      },
    ],
  },
  useCases: {
    kicker: 'Built For Business',
    title: 'Payment operations that fit the way companies work.' as string | string[],
    intro:
      'PAYLUME is designed with the day-to-day needs of modern operating teams in mind—from routine payments to cross-border coordination and transaction review.',
    items: [
      {
        title: 'Digital Commerce',
        copy: 'For businesses coordinating supplier, platform and operating payments across their commercial workflows.',
      },
      {
        title: 'Professional Services',
        copy: 'For firms seeking clearer processes around business payments, transaction records and internal review.',
      },
      {
        title: 'International Operations',
        copy: 'For eligible companies managing legitimate business payment needs across markets and counterparties.',
      },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Start a conversation.',
    copy: 'For business and partnership enquiries, get in touch with our team. We welcome conversations with businesses exploring clearer payment operations.',
    rows: [
      { key: 'Company', value: 'PAYLUME INC.', href: null },
      { key: 'Email', value: 'bd@vtransfer.io', href: 'mailto:bd@vtransfer.io' },
      {
        key: 'Registered office',
        value: '418 Broadway, Suite Y, Albany, NY 12207, United States',
        href: null,
      },
      { key: 'Jurisdiction', value: 'New York, United States', href: null },
    ],
  },
  footer: {
    copyright: '© 2026 PAYLUME INC. All rights reserved.',
    disclaimer:
      'PAYLUME INC. is a New York corporation. Service availability is subject to customer eligibility, partner requirements, applicable law and required authorizations.',
  },
}

export type Messages = typeof en

const zh: Messages = {
  meta: {
    title: 'PAYLUME INC. | 企业支付解决方案',
    description: 'PAYLUME INC. — 以清晰、可靠和负责任的运营为核心的企业支付解决方案。',
  },
  common: {
    languageLabel: '语言',
    skipToContent: '跳到主要内容',
    menuOpen: '打开菜单',
    menuClose: '关闭菜单',
    primaryNav: '主导航',
    mobileNav: '移动端导航',
    getInTouch: '开始对话',
  },
  nav: [
    { label: '关于我们', href: '#about' },
    { label: '核心能力', href: '#capabilities' },
    { label: '服务方式', href: '#approach' },
    { label: '解决方案', href: '#solutions' },
    { label: '应用场景', href: '#use-cases' },
    { label: '联系我们', href: '#contact' },
  ],
  hero: {
    eyebrow: '企业支付解决方案',
    titleLines: [
      { text: '让每一笔资金', accent: false },
      { text: '清晰流动。', accent: true },
    ],
    copy: {
      lead: 'PAYLUME INC. 致力于为企业支付构建务实可靠的基础，注重',
      emphasis: '流程清晰、运营稳定与负责任的增长。',
    },
    primaryCta: { label: '探索核心能力', href: '#capabilities' },
    secondaryCta: { label: '查看解决方案', href: '#solutions' },
    panel: {
      label: '支付工作台',
      caption: '交易流程',
      title: '从发起请求到完成，全程清晰。',
      status: '进行中',
      amountLabel: '支付金额',
      amountValue: 'USD 24,500.00',
      amountNote: '企业支付 · 全球',
      referenceLabel: '参考号',
      referenceValue: 'PY-2048',
      routeLabel: '路径',
      progressLabel: '流程进度',
      progressValue: '2 / 3',
      badge: '业务审核已完成',
      route: {
        originCode: 'USD',
        originLabel: '付款方',
        destinationCode: '全球',
        destinationLabel: '企业收款方',
      },
      steps: [
        { icon: '✓', name: '支付请求', status: '已接收', done: true },
        { icon: '✓', name: '业务审核', status: '已完成', done: true },
        { icon: '→', name: '处理中', status: '进行中', done: false },
      ],
      note: '示意流程 · 可用性取决于资质条件',
    },
  },
  trust: {
    ariaLabel: 'PAYLUME 运营原则',
    items: [
      { title: '专注企业', copy: '围绕实际运营需求构建' },
      { title: '流程驱动', copy: '清晰的步骤与标准化流程' },
      { title: '风险意识', copy: '从始至终审慎评估' },
    ],
  },
  about: {
    kicker: '关于 PAYLUME',
    title: ['为商业支付', '奠定务实基础。'],
    paragraphs: [
      'PAYLUME INC. 是一家纽约公司，专注于支持现代企业的支付需求。我们致力于让支付活动更易理解、更易管理，并在运营上保持一致。',
      '我们的方法融合业务运营、风险意识与技术能力。任何服务的可用性均取决于客户资质、交易背景、合作方要求及适用法律。',
    ],
    meta: [
      { key: '企业优先', value: '围绕实际运营需求构建' },
      { key: '流程清晰', value: '从始至终简单明了' },
      { key: '风险意识', value: '每个阶段都审慎评估' },
      { key: '技术赋能', value: '为稳定的运营而设计' },
    ],
  },
  capabilities: {
    kicker: '我们关注什么',
    title: ['清晰且负责任的', '商业支付方式。'],
    items: [
      {
        title: '企业支付',
        tag: '基于资质条件',
        copy: '结合每位客户的业务需求、资质条件和运营特征来考量支付解决方案。',
      },
      {
        title: '运营清晰',
        tag: '标准化流程',
        copy: '清晰的流程与务实的支持，帮助符合条件的客户理解其支付活动。',
      },
      {
        title: '风险意识',
        tag: '基于风险的审核',
        copy: '基于风险的方法，综合考量客户信息、预期活动与相关要求。',
      },
      {
        title: '技术赋能',
        tag: '稳定运营',
        copy: '以技术驱动的工作流程，支持稳定运营与适当的交易可见性。',
      },
    ],
  },
  approach: {
    kicker: '我们的方法',
    titleLines: ['清晰为本。', '责任为先。'],
    intro: '当商业目标、运营控制与监管责任被统筹考量时，支付关系才能发挥最佳效果。',
    steps: [
      {
        label: '了解',
        title: '掌握背景',
        copy: '我们从客户、预期用途、交易流向与地域范围出发。',
      },
      {
        label: '评估',
        title: '审核相关要求',
        copy: '在启用之前，评估资质条件、运营可行性与适用的合规要求。',
      },
      {
        label: '支持',
        title: '保持可见性',
        copy: '通过标准化流程与风险意识运营，为符合条件的活动提供支持。',
      },
    ],
  },
  solutions: {
    kicker: '解决方案',
    title: ['围绕日常商业支付', '需求而设计。'],
    items: [
      {
        label: '01 · 支付',
        title: '企业支付流程',
        copy: '面向符合条件的企业的务实支付流程，帮助其更清晰地管理日常交易活动。',
        list: ['结构化的支付请求', '审核与审批步骤', '交易状态可见性'],
      },
      {
        label: '02 · 协同',
        title: '跨境运营',
        copy: '为符合条件的国际企业支付需求提供运营支持，并遵循相关要求。',
        list: ['国际支付协同', '商业用途审核', '运营支持'],
      },
      {
        label: '03 · 洞察',
        title: '报表与对账',
        copy: '结构化的交易信息，支持内部可见性、支付审核与对账流程。',
        list: ['交易记录', '状态与活动查阅', '对账支持'],
      },
    ],
  },
  useCases: {
    kicker: '为企业而生',
    title: ['契合企业运营方式的', '支付流程。'],
    intro: 'PAYLUME 围绕现代运营团队的日常需求而设计——从日常支付到跨境协同与交易审核。',
    items: [
      {
        title: '数字商务',
        copy: '适合在商业流程中协同供应商、平台与运营支付的企业。',
      },
      {
        title: '专业服务',
        copy: '适合希望围绕企业支付、交易记录与内部审核建立更清晰流程的机构。',
      },
      {
        title: '国际运营',
        copy: '适合在不同市场与交易对手之间管理合法企业支付需求的合规企业。',
      },
    ],
  },
  contact: {
    kicker: '联系我们',
    title: '开启对话。',
    copy: '如需业务或合作咨询，欢迎与我们的团队联系。我们期待与正在探索更清晰支付运营方式的企业交流。',
    rows: [
      { key: '公司', value: 'PAYLUME INC.', href: null },
      { key: '邮箱', value: 'bd@vtransfer.io', href: 'mailto:bd@vtransfer.io' },
      {
        key: '注册地址',
        value: '418 Broadway, Suite Y, Albany, NY 12207, United States',
        href: null,
      },
      { key: '注册地', value: '美国纽约州', href: null },
    ],
  },
  footer: {
    copyright: '© 2026 PAYLUME INC. 保留所有权利。',
    disclaimer: 'PAYLUME INC. 为纽约州注册公司。服务可用性取决于客户资质、合作方要求、适用法律及必要授权。',
  },
}

export const messages: Record<Locale, Messages> = { en, zh }
