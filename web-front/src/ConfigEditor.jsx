import { Editor } from "@monaco-editor/react";

const ConfigEditor = ({ formik }) => (
    <Editor defaultLanguage="javascript" theme="vs-dark" value={formik.values.config} onChange={e => formik.setFieldValue('config', e)}/>
)

export default ConfigEditor;
