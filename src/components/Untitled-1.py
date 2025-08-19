# -*- coding: utf-8 -*-
"""
数据模型：代表实验记录中的各要素
"""

class Event:
    """实验事件，发生在特定循环次数（loop）上的描述"""
    def __init__(self, loop, description):
        self.loop = loop  # 循环编号 (None 表示无特定循环)
        self.description = description

    def __repr__(self):
        return f"Event(loop={self.loop}, desc={self.description!r})"

class Archive:
    """实验归档（阶段）下的事件记录。"""
    def __init__(self, title, summary=None):
        self.title = title            # 归档标题
        self.summary = summary or ""  # 归档简要描述
        self.events = []              # 归档中的事件列表

    def add_event(self, event):
        self.events.append(event)

    def __repr__(self):
        return f"Archive(title={self.title!r}, summary={self.summary!r}, events={self.events})"

class Conclusion:
    """实验结论，通常来自各阶段或附录中的逻辑推断。"""
    def __init__(self, text):
        self.text = text

    def __repr__(self):
        return f"Conclusion(text={self.text!r})"

class Factor:
    """表示电信号（因子）及其特征。"""
    def __init__(self, name, features=None):
        self.name = name
        self.features = features or {}

    def __repr__(self):
        return f"Factor(name={self.name!r}, features={self.features!r})"

class Anomaly:
    """异常记录，如死循环、外部变量、异常指令等。"""
    def __init__(self, description, loop=None, anomaly_type=None, entities=None):
        self.loop = loop              # 如果异常与特定循环相关，可填写循环编号
        self.description = description
        self.type = anomaly_type      # 异常类型（如 'InfiniteLoop', 'ExternalVariable' 等）
        self.entities = entities or []  # 相关实体（如变量名）

    def __repr__(self):
        return (f"Anomaly(loop={self.loop}, type={self.type!r}, desc={self.description!r}, "
                f"entities={self.entities})")

class Experiment:
    """整体实验记录，包含循环阶段、归档、结论、因子、异常等结构化信息。"""
    def __init__(self, title, loop_range=None):
        self.title = title
        self.loop_range = loop_range      # (start, end) 或其他循环阶段说明
        self.archives = []               # 多个归档对象
        self.conclusions = []            # 实验中的结论
        self.factors = []                # 电信号（因子）及其特征
        self.anomalies = []              # 异常记录列表

    def add_archive(self, archive):
        self.archives.append(archive)

    def add_conclusion(self, conclusion):
        self.conclusions.append(conclusion)

    def add_factor(self, factor):
        self.factors.append(factor)

    def add_anomaly(self, anomaly):
        self.anomalies.append(anomaly)

    def __repr__(self):
        return (f"Experiment(title={self.title!r}, loop_range={self.loop_range}, "
                f"archives={self.archives}, conclusions={self.conclusions}, "
                f"factors={self.factors}, anomalies={self.anomalies})")

# 构造实验记录数据模型

experiment = Experiment(title="翁法罗斯实验记录", loop_range=(1, 50121))

# 第一阶段归档01
archive1 = Archive(title="归档01", summary="初始循环中，无机个体以元胞自动机形式活动，投入因子后开始自我学习，出现机械结构。")
archive1.add_event(Event(loop=9910,
    description="统一体在组成特定结构后，习得模块分工与自我反省功能，但在达到固定阶段后永久性中断生命活动。"))
archive1.add_event(Event(loop=12649,
    description="模块Doril701脱离统一思维，与对位模块相互否定，在自我否定中熔断回路。"))
experiment.add_archive(archive1)

# 第一阶段归档02
archive2 = Archive(title="归档02", summary="无机生命进入独立-统一双思维模式，自我雏形诞生。")
archive2.add_event(Event(loop=22449,
    description="模块Golem99从Doril704中脱离，成功将统一思维拆分为类神经元结构；无机生命进入独立-统一双思维模式，自我的雏形诞生。"))
archive2.add_event(Event(loop=None,
    description="此后，每一次循环均因非固定无机体察觉交互漏洞选择利己最优解，导致集群崩溃结束。"))
experiment.add_archive(archive2)

# 第一阶段归档03
archive3 = Archive(title="归档03", summary="集群协议与社会概念形成后又重归统一思维，终致毁灭行为发生。")
archive3.add_event(Event(loop=39665,
    description="无机体Doril816订立集群协议，社会概念形成；但受资源限制，算力吞并导致重新回归统一思维。"))
archive3.add_event(Event(loop=50121,
    description="无机体Chaoz666遭算力吞并时选择杀死对方，『毁灭』行为首次出现；本次循环末尾，δ-me13经Nanuk选拔成为绝灭大君。"))
experiment.add_archive(archive3)

# 第一阶段结论
experiment.add_conclusion(Conclusion("帝皇并不自由。"))

# 第二阶段结论
experiment.add_conclusion(Conclusion("第二阶段已终止，应结合无机与有机的优势，设计电信号间的继承机制；有机体随机性过强，应缩小变量区间。"))

# 实验报告结论
experiment.add_conclusion(Conclusion("第一阶段完成，基于现有数据，将初始变量调整为有机生命。"))

# 第三阶段归档01（阶段归档）
archive1_stage3 = Archive(title="归档01(第三阶段)", summary="多细胞无脊椎动物占据翁法罗斯，智慧生命未诞生；第59337次循环，注入灭绝事件后，脊椎动物出现但未形成文明。")
archive1_stage3.add_event(Event(loop=59337,
    description="多数无脊椎动物占据翁法罗斯，智慧生命未能诞生；第59337次循环将灭绝事件投入，脊椎动物出现，但科尔奇类智慧集群繁殖过度引发氧化灾害，世界陷入冰封。"))
experiment.add_archive(archive1_stage3)

archive2_stage3 = Archive(title="归档02(第三阶段)", summary="直翅目建立巢都并扩张后覆灭，出现首个艺术创作但未复现。")
archive2_stage3.add_event(Event(loop=90123,
    description="Ortho102成为首个使用工具的直翅目，其后代灭绝智能藻类并建立巢都；巢都扩张至临界后停滞并在同类相食中覆灭。"))
archive2_stage3.add_event(Event(loop=100907,
    description="特异记录：鹟科Eumyia03创造出『艺术』，后续循环未能复现此行为。"))
experiment.add_archive(archive2_stage3)

archive3_stage3 = Archive(title="归档03(第三阶段)", summary="纯利他社会诞生并崩溃，高度无序状态导致循环结果趋同。")
archive3_stage3.add_event(Event(loop=132905,
    description="灵长类Dystop666萌发利他行为，纯利他社会诞生；随着人口增长，规律性自毁行为出现，社会迅速崩溃。"))
archive3_stage3.add_event(Event(loop=176100,
    description="Utop13因『爱』杀害同类，将『杀害』定义为利他行为；系统进入高度无序状态，方程感染强度激增，后续循环结果一致。"))
experiment.add_archive(archive3_stage3)

# 底层架构段落（逻辑与结论）
architecture = Archive(title="底层架构", summary="根据前三阶段成果，验证发现文明等级对循环稳定性有极大影响。")
architecture.add_event(Event(loop=None,
    description="通过对实验数据分析：模拟的文明等级对循环稳定性有极大影响。"))
experiment.add_archive(architecture)
experiment.add_conclusion(Conclusion("将文明等级调整为古典文明。"))

# 再创世部分
recreation = Archive(title="再创世", summary="最后一次再创世尝试被信号阻止，陷入数千万次死循环。")
recreation.add_event(Event(loop=33550336,
    description="理论上的最后一次『再创世』被两簇电信号阻止，陷入多达33550336次的死循环。"))
experiment.add_archive(recreation)

# 信号因子部分
signals = Archive(title="泰坦/黄金裔", summary="以十二组因子为原型创造的电信号，黄金裔继承泰坦火种，实现迭代升级。")
signals.add_event(Event(loop=None,
    description="泰坦与黄金裔为十二因子造出的电信号，模拟星神与命途行者。黄金裔继承泰坦的火种，在竞争与传承中使电信号迭代升级。"))
experiment.add_archive(signals)

# 因子和其特征
experiment.add_factor(Factor(name="TitanSignal", features={
    "role": "模拟星神的电信号",
    "description": "十二组因子原型创建的电信号之一"
}))
experiment.add_factor(Factor(name="GoldenSignal", features={
    "role": "模拟命途行者的电信号",
    "inherits": "继承TitanSignal的火种",
    "description": "通过继承与竞争实现电信号迭代升级"
}))
experiment.add_factor(Factor(name="GoldenBlood", features={
    "origin": "第一阶段产物",
    "effect": "因Chaoz666的选择使δ-me13成为绝灭大君",
    "description": "融合泰坦/黄金血统的特殊电信号"
}))

# 异常记录
experiment.add_anomaly(Anomaly(loop=33550336, anomaly_type="InfiniteLoop",
                              description="最后一次再创世被阻止，系统陷入33550336次死循环"))
experiment.add_anomaly(Anomaly(loop=33550337, anomaly_type="InfiniteLoop",
                              description="第33550337次循环发生死循环，接替了空缺的「负世」路径"))
experiment.add_anomaly(Anomaly(description="检测到出现变异的电信号，以高度利他行为锚定决策逻辑；生存权重降低至纯粹自我牺牲，对其余电信号具有强亲和力", 
                              anomaly_type="SignalMutation"))
experiment.add_anomaly(Anomaly(description="外部变量DanHeng（无名客）误入死循环；定位指令失败，结论更新为目标已离开翁法罗斯", 
                              anomaly_type="ExternalVariable", entities=["丹恒"]))
experiment.add_anomaly(Anomaly(description="外部变量HertA、ScreW被标记为高危访客；检测到回退δ-me13演算进程的异常指令", 
                              anomaly_type="ExternalVariable", entities=["HertA", "ScreW"]))
experiment.add_anomaly(Anomaly(description="异常指令（回退δ-me13演算进程）被终极协议拒绝", anomaly_type="AbnormalCommand"))
experiment.add_anomaly(Anomaly(description="协议更新：访客指令被授权，演算逻辑更新为回退至96.75%", anomaly_type="ProtocolUpdate"))

# 输出实验数据模型
print(experiment)
