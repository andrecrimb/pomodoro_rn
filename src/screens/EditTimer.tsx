import React from 'react'
import styled from '@emotion/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import SafeArea from '../components/SafeArea'
import Button from '../components/Button'
import i18n from '../i18n'
import { HomeStackParamList } from '../types/stackParamList'
import FormPickerWrapper from '../components/FormPickerWrapper'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, ScrollView } from 'react-native'
import { font } from '../theme'
import { useForm, Controller } from 'react-hook-form'
import InputField from '../components/InputField'
import useTimers from '../hooks/useTimers'
import { createArr } from '../utils'

export default ({ navigation, route }: NativeStackScreenProps<HomeStackParamList, 'editTimer'>) => {
  const { editTimer } = useTimers()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: route.params })

  const onSubmit = async (data: typeof route.params) => {
    await editTimer(data, {
      onSuccess: () => {
        navigation.pop()
      }
    })
  }

  return (
    <SafeArea>
      <ScrollView>
        <Wrapper>
          <FieldSpace>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'empty_field_message' }}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputField
                  error={error?.message}
                  placeholder={i18n.t('timer_label')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
          </FieldSpace>
          <FieldSpace>
            <Controller
              control={control}
              rules={{ required: true }}
              name="focus"
              render={({ field: { onChange, value } }) => (
                <FormPickerWrapper
                  selectedLabel={i18n.t('x_min', { count: value })}
                  label={i18n.t('focus')}>
                  <Picker
                    mode="dropdown"
                    dropdownIconColor="#fff"
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={itemValue => onChange(itemValue)}>
                    {createArr(60, 10, 5).map(v => (
                      <Picker.Item
                        key={v}
                        label={i18n.t('x_min', { count: v })}
                        value={v}
                        color="#fff"
                      />
                    ))}
                  </Picker>
                </FormPickerWrapper>
              )}
            />
          </FieldSpace>
          <FieldSpace>
            <Controller
              control={control}
              rules={{ required: true }}
              name="shortBreak"
              render={({ field: { onChange, value } }) => (
                <FormPickerWrapper
                  selectedLabel={i18n.t('x_min', { count: value })}
                  label={i18n.t('short_break')}>
                  <Picker
                    mode="dropdown"
                    dropdownIconColor="#fff"
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={itemValue => onChange(itemValue)}>
                    {createArr(15, 1).map(v => (
                      <Picker.Item
                        key={v}
                        label={i18n.t('x_min', { count: v })}
                        value={v}
                        color="#fff"
                      />
                    ))}
                  </Picker>
                </FormPickerWrapper>
              )}
            />
          </FieldSpace>
          <FieldSpace>
            <Controller
              control={control}
              rules={{ required: true }}
              name="longBreak"
              render={({ field: { onChange, value } }) => (
                <FormPickerWrapper
                  selectedLabel={i18n.t('x_min', { count: value })}
                  label={i18n.t('long_break')}>
                  <Picker
                    mode="dropdown"
                    dropdownIconColor="#fff"
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={itemValue => onChange(itemValue)}>
                    {createArr(30, 5, 5).map(v => (
                      <Picker.Item
                        key={v}
                        label={i18n.t('x_min', { count: v })}
                        value={v}
                        color="#fff"
                      />
                    ))}
                  </Picker>
                </FormPickerWrapper>
              )}
            />
          </FieldSpace>
          <FieldSpace>
            <Controller
              control={control}
              rules={{ required: true }}
              name="sections"
              render={({ field: { onChange, value } }) => (
                <FormPickerWrapper
                  selectedLabel={`${value} ${i18n.t('interval', { count: value })}`}
                  label={i18n.t('sections')}>
                  <Picker
                    mode="dropdown"
                    dropdownIconColor="#fff"
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={itemValue => onChange(itemValue)}>
                    {createArr(10, 2).map(v => (
                      <Picker.Item
                        key={v}
                        label={`${v} ${i18n.t('interval', { count: v })}`}
                        value={v}
                        color="#fff"
                      />
                    ))}
                  </Picker>
                </FormPickerWrapper>
              )}
            />
          </FieldSpace>
          <FieldSpace>
            <Controller
              control={control}
              rules={{ required: true }}
              name="intervalsForLongBreak"
              render={({ field: { onChange, value } }) => (
                <FormPickerWrapper
                  selectedLabel={`${value} ${i18n.t('interval', { count: value })}`}
                  label={i18n.t('long_break_after')}>
                  <Picker
                    mode="dropdown"
                    dropdownIconColor="#fff"
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={itemValue => onChange(itemValue)}>
                    {createArr(10, 2).map(v => (
                      <Picker.Item
                        key={v}
                        label={`${v} ${i18n.t('interval', { count: v })}`}
                        value={v}
                        color="#fff"
                      />
                    ))}
                  </Picker>
                </FormPickerWrapper>
              )}
            />
          </FieldSpace>
        </Wrapper>
      </ScrollView>
      <Footer>
        <Button
          color="primary"
          disabled={!!Object.keys(errors).length}
          onPress={handleSubmit(onSubmit)}
          title={i18n.t('edit_timer')}
        />
      </Footer>
    </SafeArea>
  )
}

//#region Styles
const FieldSpace = styled.View`
  padding: 10px 0px;
`
const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
`
const Footer = styled.View`
  margin: 10px 16px 5px 16px;
`
const styles = StyleSheet.create({
  pickerItem: { fontFamily: font[500], color: '#fff', fontSize: 18 },
  pickerWrapper: { position: 'relative', overflow: 'hidden' }
})
//#endregion
