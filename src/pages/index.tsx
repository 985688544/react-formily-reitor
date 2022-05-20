import styles from './index.less';
import {useMemo} from 'react';
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core'

import {
  SettingsForm
} from '@designable/react-settings-form'
// 容器组件
import { Designer, 
         StudioPanel,
         ViewToolsWidget,
         CompositePanel, 
         ResourceWidget,
         Workspace,
         WorkspacePanel,
         ToolbarPanel,
         ViewportPanel,
         ViewPanel,
         SettingsPanel,
         ComponentTreeWidget,
         DesignerToolsWidget
         } from '@designable/react'
import { saveSchema } from './service'

// 插件
import {LogoWidget, ActionsWidget} from './widgets'
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from './antd-components'
export default function IndexPage() {
    // 把“创建”函数和依赖项数组作为参数传入 useMemo，
  // 它仅会在某个依赖项改变时才重新计算 memoized 值。
  // 这种优化有助于避免在每次渲染时都进行高开销的计算。
  const engine = useMemo(
    () =>
    // 创建Form区域 
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              // console.log(ctx, "ctx")
              saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  return (
    // 区域容器
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        {/* 左侧工具栏区域 */}
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            {/* 输入控件 */}
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                Password,
                NumberPicker,
                Rate,
                Slider,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            {/* 布局组件 */}
            <ResourceWidget
              title="sources.Layouts"
              sources={[
                Card,
                FormGrid,
                FormTab,
                FormLayout,
                FormCollapse,
                Space,
              ]}
            />
            {/* 自增组件 */}
            <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            />
            {/* 展示组件 */}
            <ResourceWidget title="sources.Displays" sources={[Text]} />
          </CompositePanel.Item>
          {/* <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item> */}
          {/* <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item> */}
        </CompositePanel>
         {/* 被拖拽展示区域 */}
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                    }}
                  />
                )}
              </ViewPanel>
              {/* <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel> */}
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>

        {/* 属性设置区域 */}
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
}
