export const questionsData = [
  {
    id: 1,
    block: 'Техническая инфраструктура',
    blockId: 'tech',
    questions: [
      { id: 1, text: 'Есть ли у вас CI/CD для обычного ПО?' },
      { id: 2, text: 'Используете ли облачную инфраструктуру?' },
      { id: 3, text: 'Есть ли контейнеризация (Docker/K8s)?' },
      { id: 4, text: 'Используете ли системы оркестрации?' },
      { id: 5, text: 'Есть ли централизованное логирование?' },
      { id: 6, text: 'Используете ли мониторинг инфраструктуры?' },
      { id: 7, text: 'Есть ли автоматизированное тестирование?' },
      { id: 8, text: 'Используете ли Infrastructure as Code?' },
      { id: 9, text: 'Есть ли система управления артефактами?' },
      { id: 10, text: 'Используете ли Git для версионирования?' },
      { id: 11, text: 'Есть ли выделенные среды dev/stage/prod?' },
      { id: 12, text: 'Используете ли автоскейлинг?' },
      { id: 13, text: 'Есть ли backup и disaster recovery?' },
      { id: 14, text: 'Используете ли load balancing?' },
      { id: 15, text: 'Есть ли security scanning в pipeline?' }
    ],
    maxScore: 30
  },
  {
    id: 2,
    block: 'Данные и ML процессы',
    blockId: 'data',
    questions: [
      { id: 16, text: 'Есть ли DWH/Data Lake?' },
      { id: 17, text: 'Используете ли ETL/ELT процессы?' },
      { id: 18, text: 'Есть ли каталог данных?' },
      { id: 19, text: 'Применяете ли data quality мониторинг?' },
      { id: 20, text: 'Есть ли версионирование данных?' },
      { id: 21, text: 'Используете ли feature store?' },
      { id: 22, text: 'Есть ли автоматизация feature engineering?' },
      { id: 23, text: 'Применяете ли A/B тестирование моделей?' },
      { id: 24, text: 'Есть ли модель реестр?' },
      { id: 25, text: 'Используете ли автоматизированное обучение?' },
      { id: 26, text: 'Есть ли валидация моделей?' },
      { id: 27, text: 'Применяете ли drift detection?' },
      { id: 28, text: 'Есть ли мониторинг производительности моделей?' },
      { id: 29, text: 'Используете ли канареечные развертывания?' },
      { id: 30, text: 'Есть ли автоматизированный rollback?' },
      { id: 31, text: 'Применяете ли continuous training?' },
      { id: 32, text: 'Есть ли lineage tracking?' },
      { id: 33, text: 'Используете ли ML метаданные?' },
      { id: 34, text: 'Есть ли автоматизированная гиперпараметр оптимизация?' },
      { id: 35, text: 'Применяете ли explainable AI?' }
    ],
    maxScore: 40
  },
  {
    id: 3,
    block: 'Команда и процессы',
    blockId: 'team',
    questions: [
      { id: 36, text: 'Есть ли выделенная ML команда?' },
      { id: 37, text: 'Работают ли вместе DS и Engineers?' },
      { id: 38, text: 'Есть ли код ревью для ML кода?' },
      { id: 39, text: 'Используете ли agile/scrum для ML?' },
      { id: 40, text: 'Есть ли документация ML процессов?' },
      { id: 41, text: 'Проводите ли обучение команды?' },
      { id: 42, text: 'Есть ли четкие роли и ответственность?' },
      { id: 43, text: 'Используете ли incident management?' },
      { id: 44, text: 'Есть ли SLA для ML моделей?' },
      { id: 45, text: 'Проводите ли post-mortem анализ?' },
      { id: 46, text: 'Есть ли планирование capacity?' },
      { id: 47, text: 'Используете ли cross-functional команды?' },
      { id: 48, text: 'Есть ли ML архитектор в команде?' },
      { id: 49, text: 'Проводите ли регулярные ретроспективы?' },
      { id: 50, text: 'Есть ли standardized ML workflows?' }
    ],
    maxScore: 30
  },
  {
    id: 4,
    block: 'Бизнес и стратегия',
    blockId: 'business',
    questions: [
      { id: 51, text: 'Есть ли executive спонсорство для ML?' },
      { id: 52, text: 'Определена ли ML стратегия компании?' },
      { id: 53, text: 'Есть ли бюджет на MLOps инструменты?' },
      { id: 54, text: 'Измеряете ли ROI от ML проектов?' },
      { id: 55, text: 'Есть ли governance для ML?' },
      { id: 56, text: 'Соблюдаете ли compliance требования?' },
      { id: 57, text: 'Есть ли risk management для ML?' },
      { id: 58, text: 'Планируете ли масштабирование ML?' },
      { id: 59, text: 'Есть ли интеграция с business процессами?' },
      { id: 60, text: 'Измеряете ли business impact от ML?' }
    ],
    maxScore: 20
  }
];

export const maturityLevels = [
  { level: 'Начальный', range: '0-30', percent: '0-25%', color: '#ef4444', icon: '🔴' },
  { level: 'Развивающийся', range: '31-60', percent: '26-50%', color: '#f59e0b', icon: '🟡' },
  { level: 'Управляемый', range: '61-90', percent: '51-75%', color: '#10b981', icon: '🟢' },
  { level: 'Оптимизирующий', range: '91-120', percent: '76-100%', color: '#3b82f6', icon: '🟦' }
];
